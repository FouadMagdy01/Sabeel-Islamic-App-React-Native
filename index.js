/**
 * @format
 */

import {AppRegistry, I18nManager} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import TrackPlayer from 'react-native-track-player';
import PushNotification from 'react-native-push-notification';

AppRegistry.registerComponent(appName, () => App);
PushNotification.configure({
  onNotification: function (notification) {
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },
});
TrackPlayer.registerPlaybackService(() => require('./service'));
