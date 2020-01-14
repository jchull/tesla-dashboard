import React, { FC } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './App.scss';
import { LoginComponent } from '@component/auth/Login';
import { AccountComponent } from '@component/account/Account';
import { PrivateRoute } from '@component/auth/PrivateRoute';
import { Home } from '@component/view/Home';
import { UserPreferences } from '@component/account/UserPreferences';
import { TeslaAccountListComponent } from '@component/account/TeslaAccountList';
import { SyncPreferencesList } from '@component/account/SyncPreferencesList';
import { ForgotPassword } from '@component/auth/Forgot';
import { ProductSessionView } from '@component/view/ProductSessionView';
import { AppState } from '@store/store';
import { MainMenu } from '@component/common/MainMenu';

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
          <PrivateRoute
            path="/tesla-account"
            component={TeslaAccountListComponent}
            auth={auth}
          />
          <PrivateRoute
            path="/sync-preferences"
            component={SyncPreferencesList}
            auth={auth}
          />
          <PrivateRoute
            path="/preferences"
            component={UserPreferences}
            auth={auth}
          />
          <PrivateRoute
            path="/account"
            component={AccountComponent}
            auth={auth}
          />
          <PrivateRoute
            path="/dashboard"
            component={ProductSessionView}
            auth={auth}
          />
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
