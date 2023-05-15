import React, {Component} from 'react';
import {Text, View, StyleSheet, Pressable} from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import Card from './Card';
import Icon from 'react-native-vector-icons/MaterialIcons';
const GoalCard = ({goal, style, onPress}) => {
  return (
    <Card CardStyle={[styles.cardContainer, style]}>
      <Pressable
        disabled={goal.progress >= goal.count}
        onPress={onPress}
        style={styles.btn}
        android_ripple={{color: '#FFFFE0'}}>
        <View style={styles.progressWrapper}>
          {goal.progress < goal.count ? (
            <CircularProgress
              fontSize={16}
              radius={40}
              duration={700}
              maxValue={100}
              valuePrefix="%"
              value={(goal.progress / goal.count) * 100}
              activeStrokeColor="#11998e"
              activeStrokeSecondaryColor="#0a5b55"
              inActiveStrokeColor={'#2ecc71'}
              inActiveStrokeOpacity={0.2}
            />
          ) : (
            <Icon name="done" size={40} color="rgb(39, 127 , 54)" />
          )}
        </View>

        <Text style={styles.progressText}>{goal.task}</Text>
      </Pressable>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    backgroundColor: '#dce8dc',
    borderRadius: 25,
    overflow: 'hidden',
  },
  btn: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  progressWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 16,
    color: '#0a5b55',
    fontFamily: 'Tajawal-Bold',
    flexGrow: 1,
    flexWrap: 'wrap',
  },
});

export default GoalCard;
