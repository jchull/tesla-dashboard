import {AxiosInstance} from 'axios';
import decode from 'jwt-decode';

const jwtCookieRegex = /jwt=(.+);?/;

export class AuthenticationService {
  private readonly api: AxiosInstance;
  private username: string | undefined;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  getUsername(): string | undefined {
    return this.username;
  }

  async login(username: string, password: string): Promise<boolean> {
    try {
      const response = await this.api.post('/login',
          `username=${username}&password=${password}`,
          {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
      if (response) {
        const token = jwtCookieRegex.exec(document.cookie);
        if (token && token[1]) {
          this.setToken(token[1]);
          this.username = username;
          return true;
        }
      }
    } catch (e) {
      return false;
    }
    return false;
  }

  loggedIn(): boolean {
    return this.isTokenValid(this.getToken());
  }

  isTokenValid(token: string | null): boolean {
    if (!token) {
      return false;
    }
    try {
      const decoded = decode(token) as { username: string, sub: string, exp: number, client: string };
      this.username = decoded.username;
      if (decoded.sub !== 'tesla-dashboard' || !decoded.client) {
        return false;
      }
      return decoded.exp >= Date.now() / 1000;
    } catch (err) {
      return false;
    }
  }

  setToken(idToken: string) {
    sessionStorage.setItem('access_token', idToken);
  }

  getToken(): string | null {
    return sessionStorage.getItem('access_token');
  }

  logout(): Promise<void> {
    sessionStorage.removeItem('access_token');
    return this.api.get('/logout');
  }


  forgot(username: string) {
    this.api.post('/forgot',
        `username=${username}`,
        {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
  }
}


