import React, {FC, useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import './App.scss';
import {ProductList} from '@component/list/ProductList';
import {LoginComponent} from './auth/Login';
import {AccountComponent} from '@component/account/Account';
import {PrivateRoute} from './auth/PrivateRoute';
import {AppState} from './type/state';
import {Home} from '@component/view/Home';
import {LogoutComponent} from './auth/Logout';
import {authenticationService} from '@service/Services';
import {UserPreferences} from '@component/account/UserPreferences';
import {TeslaAccountListComponent} from '@component/account/TeslaAccountList';
import {SyncPreferencesList} from '@component/account/SyncPreferencesList';
import {ForgotPassword} from './auth/Forgot';

const NotFound = () => <div className="not-found"><h1>404</h1></div>;


export const App: FC<AppState> = props => {
  const [state] = useState({
    products: props.products,
    username: authenticationService.getUsername()
  });

  const routing = (
      <Router>
        <Switch>
          <Route path="/login"
                 component={LoginComponent}/>
          <Route path="/logout"
                 component={LogoutComponent}/>
          <Route path="/signup"
                 component={AccountComponent}/>
          <Route path="/forgot"
                 component={ForgotPassword}/>

          <PrivateRoute exact
                        path='/'
                        component={Home}/>
          <PrivateRoute path={'/tesla-account'}
                        component={TeslaAccountListComponent}/>
          <PrivateRoute path={'/sync-preferences'}
                        component={SyncPreferencesList}/>
          <PrivateRoute path={'/preferences'}
                        component={UserPreferences}/>
          <PrivateRoute path="/products"
                        component={ProductList}/>
          <Route component={NotFound}/>
        </Switch>
      </Router>
  );

  return (
      <div className="app">
        <header className="header">
          <div className="logo"/>
          Energy Dashboard
          <div className="main-menu">
            <a href="/">
              <i className="material-icons">menu</i>
            </a>
          </div>
        </header>
        <div className="content">
          {routing}
        </div>
      </div>
  );
};
