import React, {Component} from 'react';
import {
  Text,
  View,
  ImageBackground,
  Dimensions,
  StyleSheet,
} from 'react-native';
const width = Dimensions.get('window').width;

const SurahBeginning = ({surahName}) => {
  return (
    <View style={[styles.container, {width}]}>
      <ImageBackground
        resizeMode="stretch"
        style={styles.image}
        source={require('../../assets/pngwing.com.png')}>
        <Text style={styles.basmala}>سورة {surahName}</Text>
      </ImageBackground>
      <Text style={styles.basmala}>
        بِسْمِ اللَّـهِ الرَّحْمَـٰنِ الرَّحِيمِ
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  image: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  container: {
    width: '1005',
    minHeight: 120,
    marginBottom: 10,
  },
  basmala: {
    fontFamily: 'quran',
    fontSize: 24,
    letterSpacing: 5,
    textAlign: 'center',
  },
});
export default SurahBeginning;
