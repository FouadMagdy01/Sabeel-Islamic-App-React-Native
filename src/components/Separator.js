import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Separator = ({text, textStyle, lineColor, circle}) => {
  return (
    <View style={styles.header}>
      <View style={[styles.line, {backgroundColor: lineColor}]}></View>
      {circle && (
        <View style={styles.circle}>
          <Text style={textStyle}>{text}</Text>
        </View>
      )}
      {!circle && <Text style={textStyle}>{text}</Text>}
      <View style={[styles.line, {backgroundColor: lineColor}]}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  line: {
    height: 1,
    flex: 1,
  },
  circle: {
    width: 50,
    height: 50,
    borderWidth: 1,

    overflow: 'hidden',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginTop: 5,
  },
});

export default Separator;
