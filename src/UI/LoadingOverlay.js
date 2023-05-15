import React, {Component} from 'react';
import {Text, View, StyleSheet, ActivityIndicator} from 'react-native';

const LoadingOverlay = ({message, style}) => {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator color="#0a5b55" size="large" style={styles.loader} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loader: {
    marginBottom: 5,
  },
  message: {
    color: '#0a5b55',
    fontSize: 20,
    marginVertical: 5,
    fontFamily: 'Tajawal-Bold',
    textAlign: 'center',
    lineHeight: 30,
  },
});

export default LoadingOverlay;
