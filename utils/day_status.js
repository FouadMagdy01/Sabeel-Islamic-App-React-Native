import AsyncStorage from '@react-native-async-storage/async-storage';
export const detectNewDay = async () => {
  const today = new Date().getDay();
  const userCurrentDay = await AsyncStorage.getItem('userDay');
  if (today.toString() === userCurrentDay) {
    return 'same day';
  } else {
    await AsyncStorage.setItem('userDay', today.toString());
    return 'new day';
  }
};
