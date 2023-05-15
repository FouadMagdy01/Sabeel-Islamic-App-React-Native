import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  UIManager,
  LayoutAnimation,
  Platform,
} from 'react-native';
import Icon, {Icons} from './Icons';

const CollapsedHeader = ({
  HeaderContainerStyle,
  headerTitle,
  children,
  buttonStyle,
}) => {
  if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }
  const [pressed, setPressed] = useState(false);
  return (
    <View style={HeaderContainerStyle}>
      <Pressable
        android_ripple={{color: '#FFFFE0'}}
        onPress={() => {
          setPressed(!pressed);
          LayoutAnimation.easeInEaseOut();
        }}
        style={[styles.expandBtn, buttonStyle]}>
        <Text style={styles.text}>{headerTitle}</Text>
        <Icon
          style={styles.icon}
          color="#2e8077"
          type={Icons.AntDesign}
          name={pressed ? 'up' : 'left'}
          size={30}
        />
      </Pressable>
      {pressed ? children : null}
    </View>
  );
};

const styles = StyleSheet.create({
  expandBtn: {
    paddingHorizontal: 6,
    paddingVertical: 10,
    justifyContent: 'center',
  },
  icon: {
    position: 'absolute',
    marginLeft: 5,
  },
  text: {
    fontFamily: 'Roboto-Bold',
    color: '#2e8077',
    fontSize: 18,
  },
});

export default CollapsedHeader;
