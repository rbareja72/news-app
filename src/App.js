import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PushNotificationIOS } from 'react-native';
import PushNotification from 'react-native-push-notification';
import { GoogleSignin } from 'react-native-google-signin';
import BackgroundFetch from 'react-native-background-fetch';
import SplashScreen from 'react-native-splash-screen';
import { googleConfig } from './Apis.config';
import AppRouter from './Router';
import { store } from './Store';
import NetworkCheck from './components/common/NetworkCheck';
import NavigationService from './services/NavigationService';


class App extends Component {
  constructor() {
    super();
    PushNotification.configure({
      // (required) Called when a remote or local notification is opened or received
      onNotification: (notification) => {
        // process the notification
        NavigationService.navigate('detail', { newsItem: notification.data });
        // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true
      },
      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,
      /**
        * (optional) default: true
        * - Specified if permissions (ios) and token (android and ios) will requested or not,
        * - if not, you must call PushNotificationsHandler.requestPermissions() later
        */
      requestPermissions: true,
    });
  }

  componentDidMount() {
    GoogleSignin.configure(googleConfig);
    SplashScreen.hide();    
    BackgroundFetch.configure({
      minimumFetchInterval: 60, // <-- minutes (15 is minimum allowed)
      stopOnTerminate: false,   // <-- Android-only,
      startOnBoot: true,         // <-- Android-only
      enableHeadless: true,
      forceReload: true,
    }, () => {
      // Required: Signal completion of your task to native code
      // If you fail to do this, the OS can terminate your app
      // or assign battery-blame for consuming too much background-time
      BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_NEW_DATA);
    });
  }

  render() {
    return (
      <Provider store={store()}>
        <AppRouter
          ref={
            navigatorRef => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }
          }
        />
        <NetworkCheck />
      </Provider>
    );
  }
}

export default App;
