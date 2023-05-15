import React, {useEffect, useState} from 'react';
import {Button, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import GradientBackgroundCard from '../src/components/GradientBackgroundCard';
import * as Animatable from 'react-native-animatable';
import {useRef} from 'react';
import Separator from '../src/components/Separator';

const Quran = ({props, navigation}) => {
  return (
    <ScrollView
      style={{
        width: '100%',
        backgroundColor: '#faeded',
      }}
      contentContainerStyle={{
        alignItems: 'center',
        flexGrow: 1,
      }}>
      <Animatable.View
        duration={500}
        animation="zoomIn"
        style={{
          width: '90%',
        }}>
        <Separator
          lineColor="#5B2B2B"
          textStyle={styles.pageTitle}
          text="القرأن الكريم"
        />
        <GradientBackgroundCard
          onPress={() => {
            navigation.navigate('ListenOptions');
          }}
          btnStyle={styles.btnStyle}
          cardStyle={styles.card}
          imageSource={require('../assets/images/listen.png')}
          gradientColors={['#5B2B2B', '#2F1E1E']}>
          <Text style={styles.btnText}>الاستماع للقرأن</Text>
        </GradientBackgroundCard>
        <GradientBackgroundCard
          onPress={() => {
            navigation.navigate('ReadQuran');
          }}
          btnStyle={styles.btnStyle}
          cardStyle={styles.card}
          imageSource={require('../assets/images/multi.png')}
          gradientColors={['#5B2B2B', '#2F1E1E']}>
          <Text style={styles.btnText}>
            الاستماع والتفسير
            <Text style={[styles.btnText, {fontSize: 14}]}> (جديد)</Text>
          </Text>
        </GradientBackgroundCard>
        <GradientBackgroundCard
          onPress={() => {
            navigation.navigate('Read');
          }}
          btnStyle={styles.btnStyle}
          cardStyle={styles.bottomCard}
          imageSource={require('../assets/images/read.png')}
          gradientColors={['#5B2B2B', '#2F1E1E']}>
          <Text style={styles.btnText}>المصحف الشريف</Text>
        </GradientBackgroundCard>
      </Animatable.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  btnText: {
    fontSize: 23,
    margin: 10,
    fontFamily: 'Tajawal-Bold',
    color: 'white',
  },
  btnStyle: {
    justifyContent: 'flex-end',
  },
  card: {
    marginTop: 20,
  },
  bottomCard: {
    marginTop: 20,
    marginBottom: 100,
  },
  line: {
    height: 1,
    backgroundColor: '#5B2B2B',
    flex: 1,
  },
  pageTitle: {
    fontSize: 20,
    marginHorizontal: 5,
    fontFamily: 'Tajawal-Bold',
    color: '#5B2B2B',
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginTop: 5,
  },
});

export default Quran;
