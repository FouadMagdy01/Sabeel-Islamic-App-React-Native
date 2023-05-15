import React from 'react';
import {StyleSheet, ImageBackground, TouchableOpacity} from 'react-native';
import GradientCard from '../components/GradientCard';

const GradientBackgroundCard = ({
  children,
  imageSource,
  gradientColors,
  cardStyle,
  onPress,
  btnStyle,
}) => {
  return (
    <GradientCard colors={gradientColors} style={[styles.card, cardStyle]}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        style={[
          {
            flex: 1,
          },
          btnStyle,
        ]}>
        <ImageBackground
          resizeMode="stretch"
          style={styles.backgroundImage}
          source={imageSource}></ImageBackground>
        {children}
      </TouchableOpacity>
    </GradientCard>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: 30,
    minHeight: 180,
    overflow: 'hidden',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    opacity: 0.3,
    position: 'absolute',
  },
});

export default GradientBackgroundCard;
