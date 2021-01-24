import React, { FC } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { LoginComponent } from './auth/Login';
import { AccountComponent } from './account/Account';
import { PrivateRoute } from './auth/PrivateRoute';
import { Home } from './view/Home';
import { TeslaAccountListComponent } from './account/TeslaAccountList';
import { ForgotPassword } from './auth/Forgot';
import { AppState } from './store';
import { MainMenu } from '@tesla-dashboard/components';
import { Dashboard } from './view/Dashboard';

const NotFound = () => (
  <div className="not-found">
    <h1>404</h1>
  </div>
);

export const App: FC = () => {
  const auth = useSelector((store: AppState) => store.auth);

  const routing = (
    <Router>
      <div className="content">
        <Switch>
          <Route path="/login" component={LoginComponent} />
          <Route path="/signup" component={AccountComponent} />
          <Route path="/forgot" component={ForgotPassword} />
          <Route exact path="/" component={Home} />
          <PrivateRoute path="/tesla-account" component={TeslaAccountListComponent} auth={auth} />
          <PrivateRoute path="/account" component={AccountComponent} auth={auth} />
          <PrivateRoute path="/dashboard" component={Dashboard} auth={auth} />
          <Route component={NotFound} />
        </Switch>
      </div>
      <MainMenu />
    </Router>
  );

  return (
    <div className="app">
      <header className="header">
        <div className="logo" />
        Energy Dashboard
      </header>
      {routing}
      <div className="footer"></div>
    </div>
  );
};
