import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert, ToastAndroid} from 'react-native';
import InAppReview from 'react-native-in-app-review';
export const requestReview = async () => {
  const now = new Date().getTime();
  const lastAsked = await AsyncStorage.getItem('app-review');
  let days_from_last_request;
  if (lastAsked) {
    days_from_last_request = (now - parseInt(lastAsked)) / 1000 / 60 / 60 / 24;
  } else {
    days_from_last_request = 0;
  }

  if (days_from_last_request > 4 || days_from_last_request === 0) {
    try {
      const requestReview = await InAppReview.RequestInAppReview();
      if (requestReview) {
        ToastAndroid.showWithGravityAndOffset(
          'شكرا لك, نتمني لك تجربة مفيدة',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          10,
          250,
        );
        await AsyncStorage.setItem(
          'app-review',
          JSON.stringify(new Date().getTime()),
        );
      }
    } catch (err) {
      Alert.alert(
        'حدث خطأ ما, اذا كنت ترغب في تقييمنا يرحي الذهاب لصفحة التطبيق علي المتجر',
      );
    }
  }
};
