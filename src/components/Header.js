import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
const Header = props => {
  return (
    <View
      style={{
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
      }}>
      <Text
        style={{
          color: props.titleColor,
          fontSize: 26,
          fontFamily: 'Tajawal-Bold',
        }}>
        Sabeel
      </Text>
      <Text
        style={{
          color: props.titleColor,
          fontSize: 26,
          fontFamily: 'Tajawal-Bold',
        }}>
        سبيل
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({});
export default Header;
