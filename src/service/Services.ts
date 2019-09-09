import {AuthenticationService} from '@service/AuthenticationService';
import {ConfigurationService} from '@service/ConfigurationService';
import {UserService} from '@service/UserService';
import {QueryService} from '@service/QueryService';

export const configurationService = new ConfigurationService();
export const authenticationService = new AuthenticationService();
export const userService = new UserService();
export const queryService = new QueryService();

