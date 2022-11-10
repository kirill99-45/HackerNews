import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './app/App';

import { BrowserRouter } from 'react-router-dom';

import { rootReducer } from './components/redux/root-reducer';
import { legacy_createStore as createStore } from 'redux'
import { Provider } from 'react-redux';

import './index.css';

const store = createStore(rootReducer)

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </BrowserRouter>
);
