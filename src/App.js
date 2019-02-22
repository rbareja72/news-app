import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { GoogleSignin } from 'react-native-google-signin';
import { googleConfig } from './Apis.config';
import AppRouter from './Router';
import { store } from './Store';

export default class App extends Component {

  componentDidMount() {
    GoogleSignin.configure(googleConfig);
  }

  render() {
    return (
      <Provider store={store()}>
        <AppRouter />
      </Provider>
    );
  }
}
