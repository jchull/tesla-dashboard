import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {AuthenticationService} from '@service/AuthenticationService';

// @ts-ignore
export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
      const authenticationService = new AuthenticationService();
      if (!authenticationService.loggedIn()) {
        // not logged in so redirect to login page with the return url
        return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      }
      // authorized so return component
      return <Component {...props} />
    }} />
);
