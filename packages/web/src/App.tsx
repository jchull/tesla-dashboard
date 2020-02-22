import React, { FC } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './App.scss';
import { LoginComponent } from '@teslapp/web/src/component/auth/Login';
import { AccountComponent } from '@teslapp/web/src/component/account/Account';
import { PrivateRoute } from '@teslapp/web/src/component/auth/PrivateRoute';
import { Home } from '@teslapp/web/src/component/view/Home';
import { TeslaAccountListComponent } from '@teslapp/web/src/component/account/TeslaAccountList';
import { SyncPreferencesList } from '@teslapp/web/src/component/account/SyncPreferencesList';
import { ForgotPassword } from '@teslapp/web/src/component/auth/Forgot';
import { ProductSessionView } from '@teslapp/web/src/component/view/ProductSessionView';
import { AppState } from '@teslapp/web/src/store';
import { MainMenu } from '@teslapp/web/src/component/common/MainMenu';
import {UserPreferences} from '@teslapp/web/src/component/account/UserPreferences';

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
