import { AxiosInstance } from 'axios';
import decode from 'jwt-decode';

export class AuthenticationService {
  private readonly api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
    const existingToken = sessionStorage.getItem('access_token');
    if (existingToken) {
      api.defaults.headers.common['Authorization'] = `Bearer ${existingToken}`;
    }
  }

  getUsername(): string | undefined {
    const token = this.getToken();
    if (token) {
      return this.decode(token).username;
    }
  }

  async login(username: string, password: string): Promise<string | false> {
    try {
      const response = await this.api.post('/auth/login', {
        username,
        password
      });
      if (response) {
        const token = response.data.access_token;
        if (token) {
          this.setToken(token);
          return token;
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
      const decoded = this.decode(token) as {
        username: string;
        sub: string;
        exp: number;
        client: string;
      };
      return decoded && decoded.exp >= Date.now() / 1000;
    } catch (err) {
      return false;
    }
  }

  decode(token: string): any {
    try {
      const decoded = decode(token) as {
        username: string;
        sub: string;
        exp: number;
        client: string;
      };
      return decoded;
    } catch (err) {
      return false;
    }
  }

  setToken(idToken: string) {
    this.api.defaults.headers.common['Authorization'] = `Bearer ${idToken}`;
    sessionStorage.setItem('access_token', idToken);
  }

  getToken(): string | null {
    return sessionStorage.getItem('access_token');
  }

  logout(): Promise<void> {
    sessionStorage.removeItem('access_token');
    return this.api.get('/auth/logout');
  }

  forgot(username: string) {
    this.api.post('/auth/forgot', `username=${username}`, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
  }
}
