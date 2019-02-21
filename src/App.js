import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { GoogleSignin } from 'react-native-google-signin';
import AppRouter from './Router';
import { store } from './Store';

export default class App extends Component {

  componentDidMount() {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/userinfo.profile'],
      webClientId: '226583581847-jtv6lvlrnnr8hfaskm63nuv2ngfvt6oc.apps.googleusercontent.com',
      offlineAccess: true
    });
  }

  render() {
    return (
      <Provider store={store()}>
        <AppRouter />
      </Provider>
    );
  }
}
