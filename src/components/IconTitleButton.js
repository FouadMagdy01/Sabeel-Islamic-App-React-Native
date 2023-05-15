import React from 'react';
import {StyleSheet, Text, Pressable} from 'react-native';
import Card from '../../src/components/Card';
import Icon, {Icons} from './Icons';

const IconTitleButton = ({
  type,
  size,
  name,
  iconStyle,
  color,
  buttonStyle,
  buttonTitle,
  onPress,
  btnContainerStyle,
  rippleColor,
}) => {
  return (
    <Card CardStyle={[styles.container, btnContainerStyle]}>
      <Pressable
        onPress={onPress}
        android_ripple={{color: !rippleColor ? '#FFFFE0' : rippleColor}}
        style={[styles.btn, buttonStyle]}>
        <Icon
          type={type}
          style={iconStyle}
          name={name}
          color={color}
          size={size}
        />
        <Text style={styles.text}>{buttonTitle}</Text>
      </Pressable>
    </Card>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0a5b55',
    minHeight: 50,
    borderRadius: 12,
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 6,
    paddingVertical: 4,
    width: 'auto',
  },
  text: {
    fontFamily: 'Tajawal-Bold',
    fontSize: 14,
    color: '#dce8dc',
    textAlign: 'center',
    marginLeft: 5,
  },
});
export default IconTitleButton;
