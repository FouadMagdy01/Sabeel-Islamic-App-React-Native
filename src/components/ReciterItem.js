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

const ReciterItem = ({
  reciterName,
  moshaf,
  style,
  onPress,
  addToFavorites,
  isFavorite,
}) => {
  return (
    <Card CardStyle={[styles.card, style]}>
      <Pressable
        onPress={onPress}
        android_ripple={{color: '#FFFFE0'}}
        style={styles.button}>
        <TouchableOpacity onPress={addToFavorites} style={styles.iconWrapper}>
          {isFavorite ? (
            <Icon
              color="#3ad197"
              type={Icons.AntDesign}
              name="heart"
              size={36}
            />
          ) : (
            <Icon
              color="#3ad197"
              type={Icons.AntDesign}
              name="hearto"
              size={36}
            />
          )}
        </TouchableOpacity>
        <View style={styles.textsWrapper}>
          <Text style={styles.reciterName}>{reciterName}</Text>
          <Text style={styles.moshaf}>{moshaf}</Text>
        </View>
      </Pressable>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    marginTop: 20,
    alignSelf: 'center',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 8,
  },
  reciterName: {
    fontSize: 20,
    color: '#3ad197',
    alignSelf: 'center',
    fontFamily: 'Tajawal-Bold',
    textAlign: 'center',
  },
  moshaf: {
    fontSize: 14,
    color: '#3ad197',
    alignSelf: 'center',
    fontFamily: 'Tajawal-Regular',
    textAlign: 'center',
    lineHeight: 22,
  },
  iconWrapper: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textsWrapper: {
    flex: 1,
  },
});

export default ReciterItem;
