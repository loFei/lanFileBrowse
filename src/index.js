import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/index';
import Home from './components/home/Home';
import './styles/global.scss';
import './styles/home.scss';
import { ACTION_GET_PAGE_WITH_URL } from './constants/actionTypes';
import { PUBLIC_PATH } from './config/config';
import { isPC } from './helper/clientCheck';

ReactDOM.render(
  <Provider store={store}>
    <Home/>
  </Provider>,
  document.getElementById('root')
);

store.dispatch({
  type: ACTION_GET_PAGE_WITH_URL,
  value: PUBLIC_PATH
});

window.isPc = isPC();