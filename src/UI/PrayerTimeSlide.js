import React, {Component} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import SalahCard from '../components/SalahCard';

const PrayerSlide = ({day, index}) => {
  return (
    <View key={index} style={styles.container}>
      <SalahCard
        SalahCardStyle={styles.day}
        title={day.date.hijri.weekday.ar}
        time={day.date.readable}
        hijri={
          ' - ' +
          day.date.hijri.day +
          ' ' +
          day.date.hijri.month.en +
          ' ' +
          day.date.hijri.year
        }
      />
      <View style={styles.prayerSectionWrapper}>
        <SalahCard
          SalahCardStyle={styles.Time1}
          title="الفجر"
          time={day.timings.Fajr}
        />
        <SalahCard
          SalahCardStyle={styles.Time1}
          title="الشروق"
          time={day.timings.Sunrise}
        />
      </View>
      <View style={styles.prayerSectionWrapper}>
        <SalahCard
          SalahCardStyle={styles.Time1}
          title="العصر"
          time={day.timings.Asr}
        />
        <SalahCard
          SalahCardStyle={styles.Time1}
          title="الظهر"
          time={day.timings.Dhuhr}
        />
      </View>
      <View style={styles.prayerSectionWrapper}>
        <SalahCard
          SalahCardStyle={styles.Time1}
          title="العشاء"
          time={day.timings.Isha}
        />
        <SalahCard
          SalahCardStyle={styles.Time1}
          title="المغرب"
          time={day.timings.Maghrib}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    // backgroundColor: 'red',
    paddingVertical: 20,
  },
  day: {
    width: '90%',
    marginBottom: 10,
  },
  prayerSectionWrapper: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  Time1: {
    width: '47%',
  },
});
export default PrayerSlide;
