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
          Tesla Dashboard
            </header>
            <ProductList products={state.products}/>
        </div>
    );
};
