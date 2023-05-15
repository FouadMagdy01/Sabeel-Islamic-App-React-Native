import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Card from './Card';
const SalahCard = ({SalahCardStyle, title, time, hijri}) => {
  return (
    <Card CardStyle={[styles.card, SalahCardStyle]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.info}>
        {time}
        {hijri}
      </Text>
    </Card>
  );
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    paddingVertical: 15,
  },
  title: {
    color: '#11998e',
    fontSize: 18,
    fontFamily: 'Tajawal-Bold',
  },
  info: {
    color: '#11998e',
    fontSize: 18,
    fontFamily: 'Tajawal-Regular',
  },
});
export default SalahCard;
