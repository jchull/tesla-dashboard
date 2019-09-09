import axios, {AxiosInstance} from 'axios';

import {ConfigurationService} from '@service/ConfigurationService';
import decode from 'jwt-decode';

const configurationService = new ConfigurationService();

const jwtCookieRegex = /jwt=(.+);?/;

export class AuthenticationService {
  private readonly endpoint: string;
  private readonly api: AxiosInstance;

  constructor() {
    this.endpoint = configurationService.get('REACT_APP_API_ROOT') || '/';
    this.api = axios.create({
      withCredentials: true,
      baseURL: this.endpoint,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': 'localhost'
      }
    });

    // this.api.interceptors.response.use(
    //     response => response,
    //     error => {
    //       const originalRequest = error.config;
    //
    //       if (error.response.status === 401) {
    //         const refresh_token = localStorage.getItem('refresh_token');
    //
    //         return this.api
    //                    .post('/access-tokens/refresh', {refresh_token}, {})
    //                    .then(({data}) => {
    //                      localStorage.setItem('access_token', data.jwt);
    //
    //                      this.api.defaults.headers['X-Access-Token'] = data.jwt;
    //                      originalRequest.headers['X-Access-Token'] = data.jwt;
    //
    //                      return axios(originalRequest);
    //                    })
    //                    .catch(err => {
    //                      console.error(err)
    //                      ;
    //                    });
    //       }
    //
    //       return Promise.reject(error);
    //     }
    // );
  }

  async login(username: string, password: string): Promise<boolean> {
    const response = await this.api.post('/login',
        `username=${username}&password=${password}`,
        {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
    if (response) {
      // @ts-ignore
      const token = jwtCookieRegex.exec(document.cookie)[1];
      this.setToken(token);
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


