import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, View, Text, ScrollView, RefreshControl} from 'react-native';
import Swiper from 'react-native-swiper';
import {getPrayerTimes} from '../utils/prayer_times';
import {useSelector, useDispatch} from 'react-redux';
import PrayerSlide from '../src/UI/PrayerTimeSlide';
import {savePrayers} from '../redux/prayers';
import ErrorOverlay from '../src/UI/ErrorOverlay';

const Salah = ({navigation}) => {
  const [today, setToday] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [err, setErr] = useState(false);
  const dispatch = useDispatch();
  const handlePrayerTimes = async () => {
    await getPrayerTimes(argument => {
      if (argument === 'prayer error') {
        return setErr(true);
      }
      setErr(false);
      dispatch(
        savePrayers({
          prayers: argument,
        }),
      );
    });
  };

  const prayers = useSelector(state => state.prayers);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    handlePrayerTimes();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const getInitialIndex = () => {
    const today = new Date().getDate();
    const initialIndex = prayers.findIndex(
      e => new Date(e.date.readable).getDate() === today,
    );
    setToday(initialIndex);
  };
  useEffect(() => {
    getInitialIndex();
  }, [prayers]);

  return (
    <View style={styles.container}>
      {prayers.length === 0 && (
        <ScrollView
          refreshControl={
            <RefreshControl
              colors={['#0a5b55', '#2ecc71', '#11998e']}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          contentContainerStyle={{
            flexGrow: 1,
          }}>
          <ErrorOverlay message="حدث خطأ اثناء البحث عن مواقيت الصلاة, تأكد من اتصالك بالانترنت وتفعيلك لخدمة تحديد المواقع الجغرافية, وقم بتحديث الصفحة" />
        </ScrollView>
      )}
      {prayers.length != 0 && (
        <View
          style={{
            flex: 1,
          }}>
          <Swiper
            refreshControl={
              <RefreshControl
                colors={['#0a5b55', '#2ecc71', '#11998e']}
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
            loop={false}
            showsPagination={false}
            index={today}
            style={{
              flexGrow: 1,
            }}>
            {prayers.map((day, index) => {
              return (
                <ScrollView key={index}>
                  <PrayerSlide index={index} day={day} />
                </ScrollView>
              );
            })}
          </Swiper>
          <Text style={styles.text}>
            قم بالتمرير يمينا ويسارا لعرض باقي الايام
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dce8dc',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  day: {
    width: '90%',
    height: '17%',
    marginTop: '4%',
  },
  Time1: {
    width: '47%',
    height: '100%',
  },
  text: {
    color: '#11998e',
    fontSize: 22,
    fontFamily: 'Tajawal-Bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 100,
    lineHeight: 30,
  },
});

export default Salah;
