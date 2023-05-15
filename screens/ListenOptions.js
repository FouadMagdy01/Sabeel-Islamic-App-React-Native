import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import GradientCard from '../src/components/GradientCard';
import Icon, {Icons} from '../src/components/Icons';

const ListenOptions = ({navigation}) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Listen');
        }}
        activeOpacity={0.8}
        style={styles.cardBtn}>
        <GradientCard style={styles.btnWrapper}>
          <View style={styles.cardWrapper}>
            <View style={styles.cardInfoWrapper}>
              <View style={styles.textWrapper}>
                <Text style={styles.text}>جميع القراء</Text>
                <Text style={styles.subText}>
                  {'('}اونلاين{')'}
                </Text>
              </View>
              <Icon
                color="#c5ebe8"
                type={Icons.FontAwesome5}
                name="headphones"
                size={140}
              />
            </View>
          </View>
        </GradientCard>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('DownloadedSurah');
        }}
        activeOpacity={0.8}
        style={styles.cardBtn}>
        <GradientCard style={styles.btnWrapper}>
          <View style={styles.cardWrapper}>
            <View style={styles.cardInfoWrapper}>
              <View style={styles.textWrapper}>
                <Text style={styles.text}>المحمله سابقا</Text>
                <Text style={styles.subText}>
                  {'('}اوفلاين{')'}
                </Text>
              </View>
              <Icon
                color="#c5ebe8"
                type={Icons.FontAwesome5}
                name="cloud-download-alt"
                size={110}
              />
            </View>
          </View>
        </GradientCard>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ebf7f6',
  },
  cardBtn: {
    minHeight: 220,
    width: '90%',
    borderRadius: 24,
    marginVertical: 12,
    overflow: 'hidden',
    elevation: 16,
  },
  btnWrapper: {
    flex: 1,
  },
  cardWrapper: {
    flex: 1,
    right: '-10%',
    justifyContent: 'center',
  },
  cardInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  text: {
    fontSize: 22,
    color: 'white',
    fontFamily: 'Tajawal-ExtraBold',
  },
  subText: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Tajawal-Medium',
  },
  textWrapper: {
    marginRight: 6,
  },
});
export default ListenOptions;
