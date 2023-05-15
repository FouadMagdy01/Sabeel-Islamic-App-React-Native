import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import Card from './Card';
import Icon, {Icons} from './Icons';

const SurahItem = ({
  surahName,
  name_en,
  style,
  playHandler,
  downloadHandler,
}) => {
  return (
    <Card CardStyle={[styles.card, style]}>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          onPress={downloadHandler}
          activeOpacity={0.7}
          style={styles.iconBtn}>
          <Icon type={Icons.Entypo} name="download" size={26} color="#0a5b55" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={playHandler}
          activeOpacity={0.7}
          style={styles.iconBtn}>
          <Icon
            type={Icons.Entypo}
            name="controller-play"
            size={26}
            color="#0a5b55"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.surahInfo}>
        <Text style={styles.surahName}>{surahName}</Text>
        <Text style={styles.name_en}>{name_en}</Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    marginTop: 20,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  surahInfo: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 4,
    width: '50%',
  },
  surahName: {
    fontSize: 20,
    color: '#3ad197',
    fontFamily: 'Tajawal-Bold',
  },
  name_en: {
    fontSize: 20,
    color: '#3ad197',
    fontFamily: 'Tajawal-Regular',
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dce8dc',
  },
  buttonWrapper: {
    flexDirection: 'row',
    width: '50%',
    justifyContent: 'space-around',
  },
});

export default SurahItem;
