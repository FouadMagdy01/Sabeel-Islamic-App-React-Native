import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import {PermissionsAndroid} from 'react-native';

export const getPrayerTimes = async cb => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'معرفة مواعيد الصلاة بشكل دقيق',
        message: 'يرحي تزويدنا بموقعك لضمان ادق النتائج',
        buttonNeutral: 'ذكرني لاحقا',
        buttonNegative: 'الغاء',
        buttonPositive: 'حسنا',
      },
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      Geolocation.getCurrentPosition(
        async pos => {
          try {
            const response = await axios.get(
              `https://api.aladhan.com/v1/calendar?latitude=${pos.coords.latitude}&longitude=${pos.coords.longitude}`,
            );
            cb(response.data.data);
            await AsyncStorage.setItem(
              'prayers',
              JSON.stringify(response.data.data),
            );
          } catch (err) {
            cb('prayer error');
          }
        },
        async err => {
          if (err.code === 2) {
            const localPrayers = await AsyncStorage.getItem('prayers');
            if (!localPrayers) {
              return cb('prayer error');
            }
            const parsedPrayers = JSON.parse(localPrayers);
            const currentMonth = new Date().getMonth();
            const lastStoredMonth = new Date(
              parsedPrayers[0].date.readable,
            ).getMonth();
            if (currentMonth === lastStoredMonth) {
              cb(parsedPrayers);
            } else {
              return cb('prayer error');
            }
          }
        },
      );
      return;
    }
    cb('prayer error');
  } catch (err) {
    cb('prayer error');
  }
};
