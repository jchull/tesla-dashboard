import React, {Component} from 'react';
import {Redirect, Route} from 'react-router-dom';
import {AuthenticationService} from '../service/AuthenticationService';


interface PrivateRouteProps {
  location: string;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = (props: PrivateRouteProps, ...rest) => {

  const authenticationService = new AuthenticationService();

  return (
      <Route {...rest} render={props => {
        if (!authenticationService.loggedIn()) {
          return <Redirect to={{pathname: '/login', state: {from: props.location}}}/>;
        }
        return <Component {...props} />;
      }}/>
  );
};

