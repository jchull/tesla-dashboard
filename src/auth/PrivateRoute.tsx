import React from 'react';
import {Redirect, Route, RouteProps} from 'react-router-dom';
import {AuthState} from '../auth/actions';


interface PrivateRouteProps extends RouteProps {
  component: any;
  auth: AuthState;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = (props) => {
  const Component = props.component;
  return (
      <Route {...props} render={(props) => {
        // @ts-ignore
        if (!props.auth.username) {
          return <Redirect to={{pathname: '/login', state: {from: props.location}}}/>;
        }
        return <Component {...props} />;
      }}/>
  );
};
