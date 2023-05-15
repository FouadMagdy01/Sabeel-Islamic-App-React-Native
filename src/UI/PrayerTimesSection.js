import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import GradientCard from '../components/GradientCard';

const PrayerTimesSection = ({prayersObject}) => {
  const getPrayerName = identifier => {
    const prayerObject = prayers.find(prayer => {
      return prayer.identifier === identifier;
    });
    const prayerName = prayerObject?.text;
    return prayerName;
  };

  const changeSelectedPrayer = identifier => {
    setSelectedPrayer(identifier);
  };

  const now = new Date().getTime();
  const prayerArr = [];
  for (let key in prayersObject.timings) {
    if (
      ['Midnight', 'Lastthird', 'Firstthird', 'Imsak', 'Sunset'].includes(
        key.toString(),
      )
    ) {
      continue;
    }
    const prayerTime = prayersObject.timings[key].split(' ')[0];
    const prayerDateInMS =
      new Date(`${prayersObject.date.readable} ${prayerTime}`).getTime() - now;
    prayerArr.push({
      time: Math.abs(prayerDateInMS),
      identifier: key,
    });
  }
  const sortedPrayerArray = prayerArr.sort((a, b) => a.time - b.time);

  const prayers = [
    {
      text: 'الفجر',
      identifier: 'Fajr',
    },
    {
      text: 'الشروق',
      identifier: 'Sunrise',
    },
    {
      text: 'الظهر',
      identifier: 'Dhuhr',
    },
    {
      text: 'العصر',
      identifier: 'Asr',
    },
    {
      text: 'المغرب',
      identifier: 'Maghrib',
    },
    {
      text: 'العشاء',
      identifier: 'Isha',
    },
  ];
  const [selectedPrayer, setSelectedPrayer] = useState(
    sortedPrayerArray[0].identifier,
  );
  return (
    <View style={styles.container}>
      <GradientCard style={styles.card}>
        <ImageBackground
          resizeMode="stretch"
          style={styles.backgroundImage}
          source={require('../../assets/images/mosque.jpg')}></ImageBackground>
        <Text style={styles.date}>{prayersObject.date.hijri.weekday.ar}</Text>
        <Text style={styles.date}>
          {prayersObject.date.readable}
          {' - '}
          {`${prayersObject.date.hijri.day} ${prayersObject.date.hijri.month.en} ${prayersObject.date.hijri.year}`}
        </Text>
        <Text style={styles.prayerName}>{getPrayerName(selectedPrayer)}</Text>
        <Text style={styles.prayerTime}>
          {prayersObject.timings[selectedPrayer]}
        </Text>
      </GradientCard>
      <View style={styles.prayersSelectorContainer}>
        {prayers.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={changeSelectedPrayer.bind(this, item.identifier)}
              activeOpacity={0.7}
              style={[
                styles.prayerItem,
                {
                  backgroundColor:
                    selectedPrayer === item.identifier ? '#11998e' : null,
                },
              ]}>
              <Text
                style={[
                  styles.prayerItemText,
                  {
                    color:
                      selectedPrayer === item.identifier ? 'white' : '#0a5b55',
                  },
                ]}>
                {item.text}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  card: {
    width: '100%',
    borderRadius: 30,
    minHeight: 200,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    opacity: 0.25,
    position: 'absolute',
  },
  prayerName: {
    color: 'white',
    fontSize: 20,
    marginVertical: 5,
    fontFamily: 'Tajawal-Bold',
  },
  prayerTime: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'Tajawal-Regular',
  },
  prayersSelectorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
    backgroundColor: '#dce8dc',
    borderRadius: 12,
    overflow: 'hidden',
  },
  prayerItem: {
    paddingVertical: 10,
    width: '16%',
    alignItems: 'center',
    paddingHorizontal: 2,
  },
  prayerItemText: {
    fontSize: 12,
    fontFamily: 'Tajawal-Bold',
  },
  date: {
    color: 'white',
    fontSize: 16,
    marginTop: 5,
    fontFamily: 'Tajawal-Bold',
  },
});

export default PrayerTimesSection;
