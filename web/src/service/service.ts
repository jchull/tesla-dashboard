import {AuthenticationService} from '@service/AuthenticationService';
import {ConfigurationService} from '@service/ConfigurationService';
import {UserService} from '@service/UserService';
import {QueryService} from '@service/QueryService';

import axios from 'axios';

export const configurationService = new ConfigurationService();


export const api = axios.create({
                                  withCredentials: true,
                                  baseURL: configurationService.get('REACT_APP_API_ROOT') || '/api',
                                  headers: {
                                    'Content-Type': 'application/json',
                                    'Accept': 'application/json',
                                    'Access-Control-Allow-Origin': 'localhost'
                                  },

                                });

const authenticationService = new AuthenticationService(api);
const userService = new UserService(api);
const queryService = new QueryService(api);

const services = {api, auth: authenticationService, userService, queryService};
export type ApiType = typeof services;
export default services;

