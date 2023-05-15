import React, {Component} from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import Card from '../components/Card';
import Icon from 'react-native-vector-icons/Entypo';

const SearchBar = ({
  value,
  onChangeText,
  placeholder,
  inputStyle,
  placeholderTextColor,
  iconColor,
}) => {
  return (
    <Card CardStyle={styles.container}>
      <Icon
        color={iconColor ? iconColor : '#11998e'}
        name="magnifying-glass"
        style={styles.icon}
        size={25}
      />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={
          placeholderTextColor ? placeholderTextColor : '#11998e'
        }
        placeholder={placeholder}
        textAlign="right"
        style={[styles.input, inputStyle]}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    width: '90%',
  },
  input: {
    backgroundColor: 'white',
    flex: 1,
    fontSize: 16,
    fontFamily: 'Tajawal-Regular',
    color: '#11998e',
  },
  icon: {
    marginHorizontal: 8,
    opacity: 0.5,
  },
});

export default SearchBar;
