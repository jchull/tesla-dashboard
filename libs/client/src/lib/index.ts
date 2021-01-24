import { AuthenticationService } from './AuthenticationService';
import { ConfigurationService } from './ConfigurationService';
import { UserService } from './UserService';
import { QueryService } from './QueryService';

import axios from 'axios';

export const configurationService = new ConfigurationService();

export const api = axios.create({
  withCredentials: true,
  baseURL: configurationService.get('REACT_APP_API_ROOT') || '/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': 'localhost',
  },
});

const authenticationService = new AuthenticationService(api);
const userService = new UserService(api);
const queryService = new QueryService(api);

export const services = {
  api,
  auth: authenticationService,
  userService,
  queryService,
};
export type ApiType = typeof services;
