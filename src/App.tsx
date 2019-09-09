import React, {FC, useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import './App.scss';
import {ProductList} from '@component/list/ProductList';
import {LoginComponent} from './auth/Login';
import {AccountComponent} from '@component/account/Account';
import {PrivateRoute} from './auth/PrivateRoute';
import {TeslaAccountComponent} from '@component/account/TeslaAccount';
import {AppState} from './type/state';
import {Home} from '@component/view/Home';
import {LogoutComponent} from './auth/Logout';
import {authenticationService} from '@service/Services';

const NotFound = () => <div className="not-found"><h1>404</h1></div>;


export const App: FC<AppState> = (props: AppState) => {
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
          <Route path={'/account'}
                 component={AccountComponent}/>

          <PrivateRoute exact
                        path='/'
                        component={Home}/>
          <PrivateRoute path={'/tesla-account'}
                        component={TeslaAccountComponent}/>
          <PrivateRoute path="/products"
                        component={ProductList}/>
          <Route component={NotFound}/>
        </Switch>
      </Router>
  );

  return (
      <div className="app">
        <header className="header">
          <div className="logo"></div>
          Energy Dashboard
          <div className="main-menu">
            <i className="material-icons">menu</i>
          </div>
        </header>
        <div className="content">
          {routing}
        </div>
      </div>
  );
};
