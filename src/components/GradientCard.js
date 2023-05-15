import {View, StyleSheet, Text} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const GradientCard = ({children, style, colors}) => {
  return (
    <LinearGradient
      style={[styles.container, style]}
      colors={colors ? colors : ['#0a5b55', '#11998e']}>
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    elevation: 12,
  },
});

export default GradientCard;
