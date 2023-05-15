import React, {useState, useEffect} from 'react';
import {View, Image, StyleSheet, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swiper from 'react-native-swiper';

const Wird = () => {
  const [images, setImages] = useState([]);

  const handleDailyWird = async () => {
    const wird = await AsyncStorage.getItem('wird');
    console.log(wird);
    setImages(JSON.parse(wird));
  };

  useEffect(() => {
    handleDailyWird();
  }, []);
  return (
    <View style={styles.container}>
      <Swiper showsPagination={false} index={images.length} loop={false}>
        {images.reverse().map((url, index) => (
          <View key={index}>
            <Image
              resizeMode="stretch"
              style={{
                width: '100%',
                height: '100%',
              }}
              source={{uri: url}}
            />
          </View>
        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default Wird;
