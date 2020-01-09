import {AxiosInstance} from 'axios';
import decode from 'jwt-decode';
const jwtCookieRegex = /jwt=(.+);?/;

export class AuthenticationService {
  private readonly api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  getUsername(): string | undefined {
    const token = this.getToken();
    if(token){
      return this.decode(token).username;
    }
  }

  async login(username: string, password: string): Promise<boolean> {
    try {
      const response = await this.api.post('/api/auth/login',
          `username=${username}&password=${password}`,
          {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
      if (response) {
        const token = jwtCookieRegex.exec(document.cookie);
        if (token && token[1]) {
          this.setToken(token[1]);
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
      const decoded = this.decode(token) as { username: string; sub: string; exp: number; client: string };
      return decoded && decoded.exp >= Date.now() / 1000;
    } catch (err) {
      return false;
    }
  }

  decode(token: string): any {
    try {
      const decoded = decode(token) as { username: string; sub: string; exp: number; client: string };
      if (decoded.sub !== 'tesla-dashboard' || !decoded.client) {
        return false;
      }
      return decoded;
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
    return this.api.get('/api/auth/logout');
  }



  forgot(username: string) {
    this.api.post('/api/auth/forgot',
        `username=${username}`,
        {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
  }
}


