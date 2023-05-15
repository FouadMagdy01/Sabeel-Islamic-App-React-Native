import React, {Component} from 'react';
import {Text, View, StyleSheet, ActivityIndicator} from 'react-native';
import Icon, {Icons} from '../components/Icons';
const ErrorOverlay = ({message, style}) => {
  return (
    <View style={[styles.container, style]}>
      <Icon
        style={styles.icon}
        type={Icons.Entypo}
        name="emoji-sad"
        size={100}
        color="#0a5b55"
      />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginBottom: 5,
  },
  message: {
    color: '#0a5b55',
    fontSize: 16,
    marginVertical: 5,
    fontFamily: 'Tajawal-Bold',
    textAlign: 'center',
    lineHeight: 30,
  },
});

export default ErrorOverlay;
