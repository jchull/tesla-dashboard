import {AuthenticationService} from '@service/AuthenticationService';
import {ConfigurationService} from '@service/ConfigurationService';
import {UserService} from '@service/UserService';
import {QueryService} from '@service/QueryService';

import axios from 'axios';

export const configurationService = new ConfigurationService();


export const api = axios.create({
  withCredentials: true,
  baseURL: configurationService.get('REACT_APP_API_ROOT'),
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': 'localhost'
  }
});

export const authenticationService = new AuthenticationService(api);
export const userService = new UserService(api);
export const queryService = new QueryService(api);
