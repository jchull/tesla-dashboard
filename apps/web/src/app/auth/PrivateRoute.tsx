import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { AuthState } from './actions';

interface PrivateRouteProps extends RouteProps {
  component: any;
  auth: AuthState;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = (props) => {
  const Component = props.component;
  if (props.auth.loggedIn) {
    return (
      <Route {...props}>
        <Component {...props} />
      </Route>
    );
  } else {
    return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
  }
};
