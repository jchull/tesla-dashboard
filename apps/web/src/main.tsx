import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './app/app';
import { configureStore } from './app/store';
import { Provider } from 'react-redux';
import { services } from '@tesla-dashboard/client';

const store = configureStore(services);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
