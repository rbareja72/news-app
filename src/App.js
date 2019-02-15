import React, { Component } from 'react';
import { Provider } from 'react-redux';
import AppRouter from './Router';
import { store } from './Store';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );
  }
}
