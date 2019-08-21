import React from 'react';

import './App.scss';
import {ProductList} from './component/list/ProductList';
import {IVehicle} from './type/Vehicle';

interface AppState {
  products: Array<IVehicle>;
}

export const App: React.FC<AppState> = (props: AppState) => {
  const [state] = React.useState({
    products: props.products
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
