/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import { AppRegistry } from 'react-native';
import BackgroundFetch from 'react-native-background-fetch';
import App from './src/App';
import NotificationTaskService from './src/NotificationTaskService';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
BackgroundFetch.registerHeadlessTask(NotificationTaskService);
