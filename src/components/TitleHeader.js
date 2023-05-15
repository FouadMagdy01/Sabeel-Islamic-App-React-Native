import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
const TitleHeader = ({title, titleColor}) => {
  return (
    <View>
      <Text
        style={{
          color: titleColor,
          fontSize: 20,
          fontFamily: 'Tajawal-Bold',
        }}>
        {title}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({});
export default TitleHeader;
