import React from 'react';

import './App.scss';
import {ProductList} from '@component/list/ProductList';
import {IVehicle} from 'tesla-dashboard-api';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {LoginComponent} from './auth/Login';
import {AccountComponent} from '@component/account/Account';
import { PrivateRoute } from './auth/PrivateRoute';

interface AppState {
  products: [IVehicle];
}

const NotFound = () => <div className="not-found"><h1>404</h1></div>;


export const App: React.FC<AppState> = (props: AppState) => {
  const [state] = React.useState({
    products: props.products
  });

  const routing = (
      <Router>
        <Switch>
          <Route path="/login"
                 component={LoginComponent}/>
          <Route path={'/account'}
                 component={AccountComponent}/>
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
