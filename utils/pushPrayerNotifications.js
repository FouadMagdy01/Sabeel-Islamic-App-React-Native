import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';

export const pushPrayerNotificationHandler = async prayers => {
  const prayerObject = {
    Fajr: 'صلاة الفجر',
    Sunrise: 'الشروق',
    Dhuhr: 'صلاة الظهر',
    Asr: 'صلاة العصر',
    Maghrib: 'صلاة المغرب',
    Isha: 'صلاة العشاء',
  };
  const PushNotificationPermission = await AsyncStorage.getItem(
    'prayer_notification',
  );
  if (!PushNotificationPermission) {
    return;
  }
  PushNotification.cancelAllLocalNotifications();
  const today = new Date().getDate();
  const upcomingPrayers = prayers.slice(today - 1);
  upcomingPrayers.forEach(prayer => {
    const day_date = prayer.date.readable;
    for (let key in prayer.timings) {
      if (
        ['Midnight', 'Lastthird', 'Firstthird', 'Imsak', 'Sunset'].includes(
          key.toString(),
        )
      ) {
        continue;
      }
      const prayerTime = prayer.timings[key].split(' ')[0];
      const notificationDate = new Date(`${day_date} ${prayerTime}`);
      const now = new Date().getTime();
      if (notificationDate.getTime() - now > 0) {
        PushNotification.localNotificationSchedule({
          message: `حان الان موعد ${prayerObject[key]} حسب توقيت موقعك`,
          vibrate: false,
          title: prayerObject[key] + ' ' + prayer.timings[key],
          soundName: key.toString() === 'sunrise' ? 'default' : 'adhan.mp3',
          channelId: 'prayer_times',
          date: notificationDate,
        });
      }
    }
  });
};
