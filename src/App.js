import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { GoogleSignin } from 'react-native-google-signin';
import SplashScreen from 'react-native-splash-screen';
import { googleConfig } from './Apis.config';
import AppRouter from './Router';
import { store } from './Store';
import NetworkCheck from './components/common/NetworkCheck';

class App extends Component {

  componentDidMount() {
    GoogleSignin.configure(googleConfig);
    SplashScreen.hide();
  }

  render() {
    return (
      <Provider store={store()}>
        <AppRouter />
        <NetworkCheck />
      </Provider>
    );
  }
}

export default App;
