import React              from 'react';
import { render }         from 'react-dom';
import { App }            from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {configureStore} from "./store/store";
import {Provider} from "react-redux";
import services from '@service/service';

const store = configureStore(services);

const Root = () => (
    <Provider store={store}>
      <App />
    </Provider>
);

render(<Root />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
