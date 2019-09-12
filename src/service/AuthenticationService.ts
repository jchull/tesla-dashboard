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
    const response = await this.api.post('/login',
        `username=${username}&password=${password}`,
        {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
    if (response) {
      // @ts-ignore
      const token = jwtCookieRegex.exec(document.cookie)[1];
      this.setToken(token);
      this.username = username;
      return true;
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
      const decoded = decode(token);
      // @ts-ignore
      this.username = decoded.username;
      // @ts-ignore
      return decoded.exp > Date.now() / 1000;
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

  logout() {
    sessionStorage.removeItem('access_token');
  }


}


