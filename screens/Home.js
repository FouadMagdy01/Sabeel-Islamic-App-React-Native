import React, {useState, useEffect, useRef} from 'react';
import {Text, StyleSheet, View, ScrollView, RefreshControl} from 'react-native';
import {detectNewDay} from '../utils/day_status';
import {generateGoals} from '../utils/generate_goals';
import {useSelector, useDispatch} from 'react-redux';
import HomeCard from '../src/components/HomeCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PrayerTimesSection from '../src/UI/PrayerTimesSection';
import GoalCard from '../src/components/GoalCard';
import {saveGoals} from '../redux/todos';
import {getPrayerTimes} from '../utils/prayer_times';
import {savePrayers} from '../redux/prayers';
import ErrorOverlay from '../src/UI/ErrorOverlay';
import LoadingOverlay from '../src/UI/LoadingOverlay';
import * as Animatable from 'react-native-animatable';
import {pushPrayerNotificationHandler} from '../utils/pushPrayerNotifications';
const Home = ({navigation}) => {
  const dispatch = useDispatch();

  const goals = useSelector(state => state.todos);
  const goalsRef = useRef(goals);
  const [err, setErr] = useState(false);
  const [prayerObj, setPrayerObj] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const homeNavigationHandler = (goalItem, screenName) => {
    if (goalItem?.type === 'tasbeeh') {
      navigation.navigate('Tasbeeh', {
        goalProgress: goalItem.progress,
        goalTarget: goalItem.count,
      });
      return;
    }
    if (goalItem?.type === 'quran') {
      navigation.navigate('Read');
      return;
    }
    if (screenName) {
      navigation.navigate(screenName);
    }
  };

  const handlePrayerTimes = async () => {
    await getPrayerTimes(async argument => {
      if (argument === 'prayer error') {
        return setErr(true);
      }
      console.log(argument);
      setErr(false);
      const today = new Date().getDate();
      const today_prayer_object = argument.find(
        e => new Date(e.date.readable).getDate() === today,
      );
      setPrayerObj(today_prayer_object);
      dispatch(
        savePrayers({
          prayers: argument,
        }),
      );
      await pushPrayerNotificationHandler(argument);
    });
  };

  const TODOS_Setup = async () => {
    const dayStatus = await detectNewDay();
    if (dayStatus === 'new day') {
      const newGoals = await generateGoals();
      dispatch(
        saveGoals({
          goals: newGoals,
        }),
      );
      return;
    }
    if (dayStatus === 'same day') {
      const localGoals = await AsyncStorage.getItem('goals');
      if (!localGoals) {
        const newGoals = await generateGoals();
        dispatch(
          saveGoals({
            goals: newGoals,
          }),
        );
        return;
      }
      const fetchedGoals = JSON.parse(localGoals);
      dispatch(
        saveGoals({
          goals: fetchedGoals,
        }),
      );
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    handlePrayerTimes();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    handlePrayerTimes();
  }, []);

  useEffect(() => {
    TODOS_Setup();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl
            colors={['#0a5b55', '#2ecc71', '#11998e']}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainerStyle}>
        <View style={styles.scrollWrapper}>
          {/* //prayer times section */}
          <View style={styles.prayerTimeView}>
            {err && (
              <ErrorOverlay message="حدث خطأ اثناء البحث عن مواقيت الصلاة, تأكد من اتصالك بالانترنت وتفعيلك لخدمة تحديد المواقع الجغرافية, وقم بتحديث الصفحة" />
            )}
            {!err && !prayerObj && (
              <LoadingOverlay message="جاري تحميل مواقيت الصلاه" />
            )}
            {prayerObj && <PrayerTimesSection prayersObject={prayerObj} />}
          </View>
          <Text style={styles.sectionTitle}>الاقسام الرئيسية</Text>
          <View style={styles.buttonsContainer}>
            <HomeCard
              onPress={homeNavigationHandler.bind(this, null, 'Azkar')}
              title="اذكار "
              imageUrl={require('../assets/images/azkarV.png')}
            />
            <HomeCard
              onPress={homeNavigationHandler.bind(this, null, 'Doaa')}
              title="أدعيه"
              imageUrl={require('../assets/images/doaaV.png')}
            />
          </View>
          <View style={styles.buttonsContainer}>
            <HomeCard
              onPress={homeNavigationHandler.bind(this, null, 'Wird')}
              title="الورد اليومي"
              imageUrl={require('../assets/images/werd.png')}
            />
            <HomeCard
              onPress={homeNavigationHandler.bind(this, null, 'Tasbeeh')}
              title="تسابيح"
              imageUrl={require('../assets/images/muslim2.png')}
            />
          </View>
          <Text style={styles.sectionTitle}>الاهداف اليومية</Text>
          <View style={styles.buttonsContainer}></View>
          {goals.length === 0 && (
            <LoadingOverlay message="جاري تحميل المهام اليوميه" />
          )}
          {goals.map((goal, index) => {
            return (
              <View key={index}>
                <GoalCard
                  onPress={homeNavigationHandler.bind(this, goal)}
                  style={{
                    marginBottom: index + 1 === goals.length ? 100 : 15,
                  }}
                  goal={goal}
                />
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollWrapper: {
    width: '95%',
    marginTop: 15,
  },
  scrollContainerStyle: {
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  sectionTitle: {
    color: '#0a5b55',
    fontFamily: 'Tajawal-Bold',
    fontSize: 20,
    marginVertical: 8,
    textAlign: 'center',
  },
  prayerTimeView: {
    minHeight: 250,
    alignItems: 'center',
  },
});
export default Home;
