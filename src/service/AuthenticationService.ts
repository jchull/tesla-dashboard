import axios from 'axios';

import decode from 'jwt-decode';

// TODO: get from config
const ENDPOINT = 'http://localhost:3001/login';


export class AuthenticationService {
    endpoint: string;

    constructor(endpoint: string = ENDPOINT) {
        this.endpoint = endpoint; // API server domain
    // this.fetch = this.fetch.bind(this); // React binding stuff
    // this.login = this.login.bind(this);
    // this.getProfile = this.getProfile.bind(this);
    }

    async login(username: string, password: string): Promise<boolean>  {
        const response = await axios.post(this.endpoint, {username,password});
        if(response && response.hasOwnProperty('token')){
            // @ts-ignore
            const token = response.token;
            this.setToken(token);
            return true;
        }
        return false;
    }

    loggedIn(): boolean {
        return this.isTokenValid(this.getToken());
    }

    isTokenValid(token: string | null): boolean {
        if(!token)
            return false;
        try {
            const decoded = decode(token);
            // @ts-ignore
            if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
                return true;
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    }

    setToken(idToken: string) {
    // Saves user token to localStorage
        localStorage.setItem('id_token', idToken);
    }

    getToken(): string | null {
    // Retrieves the user token from localStorage
        return localStorage.getItem('id_token');
    }

    logout() {
    // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
    }

    getProfile() {
        const token = this.getToken();
        return token && decode(token);
    }

}
