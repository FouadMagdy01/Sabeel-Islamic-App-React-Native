import {Text, StyleSheet, View, Dimensions} from 'react-native';
import React, {Component} from 'react';
import Card from '../components/Card';
import * as Progress from 'react-native-progress';
const width = Dimensions.get('window').width;
const DownloadOverlay = ({value, percentage}) => {
  return (
    <View style={styles.container}>
      <Card CardStyle={styles.card}>
        <Text style={styles.message}>
          جاري تحميل السورة..... الرجاء الانتظار حتي يتم اكتمال التحميل
        </Text>
        <Progress.Bar
          color="#11998e"
          borderColor="#0a5b55"
          progress={value}
          width={width * 0.8}
        />
        <Text style={styles.percentage}>{percentage} %</Text>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `rgba(0, 0,0,0.5)`,
  },
  card: {
    backgroundColor: '#c5d1cc',
    width: width * 0.9,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 45,
  },
  message: {
    color: '#0a5b55',
    fontSize: 16,
    marginVertical: 5,
    fontFamily: 'Tajawal-Bold',
    textAlign: 'center',
    lineHeight: 30,
    marginBottom: 20,
  },
  percentage: {
    color: '#0a5b55',
    fontSize: 16,
    marginVertical: 5,
    fontFamily: 'Tajawal-Bold',
    textAlign: 'center',
    lineHeight: 30,
  },
});

export default DownloadOverlay;
