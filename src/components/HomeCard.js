import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import Card from './Card';
import GradientCard from './GradientCard';
const HomeCard = ({imageUrl, title, onPress}) => {
  return (
    <Card CardStyle={styles.container}>
      <Pressable
        onPress={onPress}
        android_ripple={{color: '#FFFFE0'}}
        style={styles.btn}>
        <Image resizeMode="contain" style={styles.image} source={imageUrl} />
        <Text style={styles.timeText}>{title}</Text>
      </Pressable>
    </Card>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '45%',
    backgroundColor: '#dce8dc',
    marginBottom: 18,
    borderRadius: 18,
    overflow: 'hidden',
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
  },
  image: {
    width: 75,
    height: 80,
  },
  timeText: {
    fontFamily: 'Tajawal-Bold',
    fontSize: 15,
    color: '#0a5b55',
    margin: 5,
  },
});
export default HomeCard;
