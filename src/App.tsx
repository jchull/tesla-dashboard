import React from 'react';

import './App.css';
import {ProductList} from './component/list/ProductList';
import {ProductType} from './type/ProductType';

interface AppState {
  products: ProductType[];
}

export const App: React.SFC<AppState> = () => {
  const [state] = React.useState({
    products: []
  });

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
          <ProductList products={state.products}/>
        </div>
      </div>
  );
};
