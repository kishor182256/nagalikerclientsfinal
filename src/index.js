import React from 'react';
import ReactDOM from 'react-dom';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { Provider } from 'react-redux';
import "./index.css";
import App from './App';
import store from './redux/store';
ReactDOM.render(
  <Provider store={store}>
      <ToastContainer position="top-center"/>
      <App/>
  </Provider>,
  document.getElementById('root')
);


