import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Pressable} from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import Card from './Card';
import Icon, {Icons} from './Icons';

const AzkarCard = ({count, text, CardStyle}) => {
  const [times, setTimes] = useState(0);
  return (
    <Card CardStyle={[styles.container, CardStyle]}>
      <View style={styles.timesContainer}>
        <Text style={styles.timesText}>
          {count > 2 && count <= 10 && `${count} مرات`}
          {count === 2 && 'مرتان'}
          {count === 1 && 'مرة واحده'}
          {count > 10 && `${count} مره`}
        </Text>
      </View>
      <Text style={styles.text}>{text}</Text>
      {times === count && (
        <View style={{alignSelf: 'center'}}>
          <Icon
            type={Icons.MaterialIcons}
            name="done"
            color="#11998e"
            size={36}
          />
        </View>
      )}
      {times < count && (
        <View style={styles.progressWrapper}>
          <Pressable
            onPress={() => {
              setTimes(times + 1);
            }}
            android_ripple={{color: '#50948f'}}
            style={styles.iconBtn}>
            <Icon type={Icons.Entypo} name="plus" color="#dce8dc" size={30} />
          </Pressable>
          <CircularProgress
            fontSize={16}
            radius={40}
            duration={250}
            maxValue={count}
            value={times}
            activeStrokeColor="#11998e"
            activeStrokeSecondaryColor="#0a5b55"
            inActiveStrokeColor={'#2ecc71'}
            inActiveStrokeOpacity={0.2}
          />
          <Pressable
            onPress={() => {
              if (times === 0) {
                return;
              }
              setTimes(times - 1);
            }}
            android_ripple={{color: '#FFFFE0'}}
            style={styles.iconBtn}>
            <Icon type={Icons.Entypo} name="minus" color="#dce8dc" size={30} />
          </Pressable>
        </View>
      )}
    </Card>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 6,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginBottom: 20,
    width: '100%',
  },
  timesContainer: {
    backgroundColor: '#0a5b55',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
    paddingVertical: 10,
  },
  timesText: {
    color: '#dce8dc',
    fontSize: 18,
    fontFamily: 'Tajawal-Bold',
    lineHeight: 30,
  },
  text: {
    fontFamily: 'Tajawal-ExtraBold',
    fontSize: 20,
    lineHeight: 40,
    color: '#11998e',
    textAlign: 'center',
  },
  progressWrapper: {
    flexDirection: 'row',
    width: '75%',
    justifyContent: 'space-around',
    marginVertical: 10,
    alignItems: 'center',
  },
  iconBtn: {
    backgroundColor: '#11998e',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
    height: 40,
  },
});
export default AzkarCard;
