import React, {useEffect, useState} from 'react';
import {Button, ScrollView, StyleSheet, Text, View} from 'react-native';
import GradientBackgroundCard from '../src/components/GradientBackgroundCard';
import * as Animatable from 'react-native-animatable';
import Separator from '../src/components/Separator';

const Library = ({props, navigation}) => {
  return (
    <ScrollView
      style={{
        width: '100%',
        backgroundColor: '#f5fcfc',
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
          lineColor="#0a5b55"
          textStyle={styles.pageTitle}
          text="مكتبة سبيل"
        />
        <GradientBackgroundCard
          onPress={() => {
            navigation.navigate('Sunnah');
          }}
          btnStyle={styles.btnStyle}
          cardStyle={styles.card}
          imageSource={require('../assets/images/sunnah.jpg')}>
          <Text style={styles.btnText}>السنه النبويه</Text>
        </GradientBackgroundCard>
        <GradientBackgroundCard
          onPress={() => {
            navigation.navigate('Books');
          }}
          btnStyle={styles.btnStyle}
          cardStyle={styles.card}
          imageSource={require('../assets/images/books.png')}>
          <Text style={styles.btnText}>كتب ومقالات اسلاميه</Text>
        </GradientBackgroundCard>
        <GradientBackgroundCard
          onPress={() => {
            navigation.navigate('Fatwa');
          }}
          btnStyle={styles.btnStyle}
          cardStyle={styles.bottomCard}
          imageSource={require('../assets/images/fatwa.png')}>
          <Text style={styles.btnText}>فتاوي متنوعة</Text>
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

  pageTitle: {
    fontSize: 20,
    marginHorizontal: 5,
    fontFamily: 'Tajawal-Bold',
    color: '#0a5b55',
  },
});

export default Library;
