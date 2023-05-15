import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
const Card = ({children, CardStyle}) => {
  return <View style={[styles.shadow, CardStyle]}>{children}</View>;
};
const styles = StyleSheet.create({
  shadow: {
    elevation: 12,
    overflow: 'hidden',
  },
});
export default Card;
