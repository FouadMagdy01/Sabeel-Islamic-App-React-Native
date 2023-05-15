import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, StatusBar} from 'react-native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import Tabs from './navigation/tabs';
import Header from './src/components/Header';
import Listen from './screens/Listen';
import Surah from './screens/Surah';
import Azkar from './screens/Azkar';
import Read from './screens/Read';
import TrackPlayer, {Capability} from 'react-native-track-player';
import SplashScreen from 'react-native-splash-screen';
import PushNotification from 'react-native-push-notification';
import Tasbeeh from './screens/Tasbeeh';
import Doaa from './screens/Doaa';
import Wird from './screens/Wird';
import ReadQuran from './screens/ReadQuran';
import CollectionDetails from './screens/CollectionDetails';
import Hadith from './screens/Hadiths';
import Sunnah from './screens/Sunnah';
import Books from './screens/Books';
import Fatwa from './screens/Fatwa';
import ListenOptions from './screens/ListenOptions';
import DownloadedSurah from './screens/DownloadedSurah';
import PdfReader from './screens/PdfReader';

const Stack = createStackNavigator();

const App = () => {
  const setup = async () => {
    SplashScreen.hide();
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      stoppingAppPausesPlayback: true,
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
        Capability.SeekTo,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
        Capability.SeekTo,
      ],
      notificationCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
        Capability.SeekTo,
      ],
    });
    PushNotification.createChannel({
      channelId: 'prayer_times', // (required)
      channelName: 'Prayer Times', // (required)
      soundName: 'adhan.mp3',
    });

    PushNotification.createChannel({
      channelId: 'todos', // (required)
      channelName: 'todos, wird', // (required)
    });
  };

  useEffect(() => {
    setup();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar
          barStyle="dark-content"
          translucent
          backgroundColor="transparent"
        />
        <Stack.Navigator
          screenOptions={{
            ...TransitionPresets.SlideFromRightIOS,
            headerTitle: props => <Header titleColor="#11998e" {...props} />,
            headerShown: true,
            headerStyle: {
              backgroundColor: 'white',
              elevation: 12,
              shadowColor: '#11998e',
            },
            headerTintColor: '#11998e',
            headerTitleStyle: {color: 'white'},
          }}
          initialRouteName={'Tabs'}>
          <Stack.Screen
            name="Tabs"
            component={Tabs}
            options={{
              ...TransitionPresets.SlideFromRightIOS,
              headerShown: false,
            }}
          />
          <Stack.Screen name="Listen" component={Listen} />
          <Stack.Screen name="Read" component={Read} />
          <Stack.Screen name="Surah" component={Surah} />
          <Stack.Screen name="Azkar" component={Azkar} />
          <Stack.Screen name="Tasbeeh" component={Tasbeeh} />
          <Stack.Screen name="Doaa" component={Doaa} />
          <Stack.Screen name="Wird" component={Wird} />
          <Stack.Screen name="ReadQuran" component={ReadQuran} />
          <Stack.Screen
            name="CollectionDetails"
            component={CollectionDetails}
          />
          <Stack.Screen name="Sunnah" component={Sunnah} />
          <Stack.Screen name="Hadith" component={Hadith} />
          <Stack.Screen name="Books" component={Books} />
          <Stack.Screen name="Fatwa" component={Fatwa} />
          <Stack.Screen name="ListenOptions" component={ListenOptions} />
          <Stack.Screen name="DownloadedSurah" component={DownloadedSurah} />
          <Stack.Screen name="PdfReader" component={PdfReader} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
const styles = StyleSheet.create({});
export default App;
