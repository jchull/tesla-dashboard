/* eslint-disable camelcase */
// Copied from https://gist.github.com/jorenvandeweyer/52f4914c714429df6814b762df4f0a40
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import * as crypto from 'crypto';
import * as qs from 'querystring';
import URLSafeBase64 from 'urlsafe-base64';
import cryptoRandomString from 'crypto-random-string';
import { Cookie, CookieJar } from 'tough-cookie';
import { EventEmitter } from 'events';

interface OAuthParameters {
  client_id: 'ownerapi';
  code_challenge: string;
  code_challenge_method: string;
  redirect_uri: string;
  response_type: string;
  scope: string;
  state: string;
}

interface OAuthBody {
  _csrf: string;
  _phase: string;
  _process: string;
  transaction_id: string;
  cancel: string;
  identity: string;
  credential: string;
}

const CLIENT_ID = '81527cff06843c8634fdc09e8ac0abefb46ac849f38fe1e431c2ef2106796384';

class Authenticator extends EventEmitter {
  private jar: CookieJar;
  private http: AxiosInstance;

  private parameters?: OAuthParameters;
  private codeVerifier?: string;
  private code?: string;
  private transactionId?: string;

  constructor() {
    super();

    this.jar = new CookieJar();

    this.http = axios.create({
      maxRedirects: 0,
      validateStatus: (status) => {
        return (status >= 200 && status < 300) || status === 302;
      },
    });

    this.http.interceptors.request.use((config) => {
      this.jar.getCookies(config.url, {}, (err, cookies: string[]) => {
        if (err) return;
        config.headers.cookie = cookies.join('; ');
      });

      return config;
    });

    this.http.interceptors.response.use((response) => {
      if (response.headers['set-cookie'] instanceof Array) {
        response.headers['set-cookie'].forEach((c) => {
          this.jar.setCookie(Cookie.parse(c), response.config.url, () => {});
        });
      }

      return response;
    });
  }

  async login(username: string, password: string, mfaCode?: string) {
    if (!this.parameters) this.generateParameters();

    let body: OAuthBody;

    try {
      const hidden = await this.scrapeOauthForm();

      body = {
        _csrf: hidden.csrf,
        _phase: hidden.phase,
        _process: hidden.process,
        transaction_id: hidden.transactionId,
        cancel: hidden.cancel,
        identity: username,
        credential: password,
      };
    } catch (e) {
      return this.emit('error', 'scraping oauth form failed');
    }

    let res: AxiosResponse;

    try {
      res = await this.http.post(this.oauth2url, qs.stringify(body as any), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
    } catch (e) {
      return this.emit('error', 'invalid credentials');
    }

    if (res.status === 200 && res.data?.includes('/mfa/verify')) {
      if (!mfaCode) return this.emit('mfa');
      else return await this.mfaCode(mfaCode);
    } else {
      this.parseCallback(res.headers.location);

      return await this.exchangeCode();
    }
  }

  async mfaCode(mfaCode: string) {
    const url = `https://auth.tesla.com/oauth2/v3/authorize/mfa/factors?transaction_id=${this.transactionId}`;

    const res1 = await this.http.get(url);
    const factorId = res1.data.data[0].id;

    const mfaPayload = {
      transaction_id: this.transactionId,
      factor_id: factorId,
      passcode: mfaCode,
    };

    try {
      const res = await this.http.post('https://auth.tesla.com/oauth2/v3/authorize/mfa/verify', mfaPayload);

      if (!res?.data?.data.valid) return this.emit('error', 'invalid mfaCode');
    } catch (e) {
      return this.emit('error', e?.response?.data?.error?.code);
    }

    const res2 = await this.http.post(this.oauth2url, { transaction_id: this.transactionId });

    this.parseCallback(res2.headers.location);

    return await this.exchangeCode();
  }

  async refresh(refreshToken: string) {
    const payload = {
      grant_type: 'refresh_token',
      client_id: 'ownerapi',
      refresh_token: refreshToken,
      scope: 'openid email offline_access',
    };

    const res = await this.http.post('https://auth.tesla.com/oauth2/v3/token', payload);

    const ownerApi = await this.ownerApiToken(res.data.access_token);

    const tokens = {
      auth: res.data,
      ownerApi,
    };

    this.emit('ready', tokens);

    return tokens;
  }

  private async ownerApiToken(accessToken: string) {
    const payload = {
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      client_id: CLIENT_ID,
    };

    const res = await this.http.post('https://owner-api.teslamotors.com/oauth/token', payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return res.data;
  }

  private async exchangeCode() {
    const payload = {
      grant_type: 'authorization_code',
      client_id: 'ownerapi',
      code_verifier: this.codeVerifier,
      code: this.code,
      redirect_uri: 'https://auth.tesla.com/void/callback',
    };

    const res = await this.http.post('https://auth.tesla.com/oauth2/v3/token', payload);

    const ownerApi = await this.ownerApiToken(res.data.access_token);

    const tokens = {
      auth: res.data,
      ownerApi,
    };

    this.emit('ready', tokens);

    return tokens;
  }

  private generateParameters() {
    this.codeVerifier = URLSafeBase64.encode(Buffer.from(cryptoRandomString(86), 'utf-8')).trim();

    const hash = crypto.createHash('sha256').update(this.codeVerifier).digest('hex');
    const codeChallenge = URLSafeBase64.encode(Buffer.from(hash, 'utf8')).trim();
    const state = URLSafeBase64.encode(crypto.randomBytes(16));

    this.parameters = {
      client_id: 'ownerapi',
      code_challenge: codeChallenge,
      code_challenge_method: 'S265',
      redirect_uri: encodeURIComponent('https://auth.tesla.com/void/callback'),
      response_type: 'code',
      scope: encodeURIComponent('openid email offline_access'),
      state: state,
    };
  }

  private async scrapeOauthForm() {
    const res = await this.http.get(this.oauth2url);

    const match = (data: string, regex: RegExp) => {
      const m = data.match(regex);

      return m ? m[1] : '';
    };

    const csrf = match(res.data, /name="_csrf".+value="([^"]+)"/);
    const transactionId = match(res.data, /name="transaction_id".+value="([^"]+)"/);
    const phase = match(res.data, /name="_phase".+value="([^"]+)"/);
    const process = match(res.data, /name="_process".+value="([^"]+)"/);
    const cancel = match(res.data, /name="cancel".+value="([^"]+)"/);

    this.transactionId = transactionId;

    return { csrf, transactionId, phase, process, cancel };
  }

  private parseCallback(location: string) {
    const url = new URL(location);

    this.code = url.searchParams.get('code');
  }

  private get oauth2url() {
    return `https://auth.tesla.com/oauth2/v3/authorize?client_id=${this.parameters.client_id}&code_challenge=${this.parameters.code_challenge}&code_challenge_method=${this.parameters.code_challenge_method}&redirect_uri=${this.parameters.redirect_uri}&response_type=${this.parameters.response_type}&scope=${this.parameters.scope}&state=${this.parameters.state}`;
  }
}

async function main() {
  const email = 'email';
  const password = 'password';
  const mfaCode = 'code';

  const authenticator = new Authenticator();

  authenticator.on('error', (message) => {
    console.log('err:', message);
  });

  authenticator.on('ready', (credentials) => {
    console.log(credentials);
  });

  authenticator.on('mfa', () => authenticator.mfaCode(mfaCode));

  authenticator.login(email, password);

  // const tokens = await authenticator.login(email, password, mfaCode)
  // console.log('tokens:', tokens)

  // authenticator.refresh(tokens.auth.refresh_token)
}

// main()
