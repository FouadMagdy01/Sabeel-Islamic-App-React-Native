import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {tutorial} from '../../data/tutorial';
import Icon, {Icons} from '../components/Icons';
const QuranTutorialModal = ({closeModal}) => {
  const {width, height} = useWindowDimensions();

  return (
    <View style={styles.container}>
      <View
        style={[styles.wrapper, {height: height * 0.75, width: width * 0.9}]}>
        <TouchableOpacity onPress={closeModal} style={styles.exitBtn}>
          <Icon
            name="remove"
            type={Icons.FontAwesome}
            size={38}
            color="#b39262"
          />
        </TouchableOpacity>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Text style={styles.sectionHeader}>دليل الاستخدام</Text>
          {tutorial.map((step, index) => {
            return (
              <View
                style={{
                  marginHorizontal: 6,
                  marginVertical: 10,
                }}
                key={index}>
                <Text style={styles.text}>{step.text}</Text>
                <Image
                  resizeMode="stretch"
                  source={step.imageSrc}
                  style={{
                    height: step.imageHeight,
                    width: '100%',
                    borderRadius: 15,
                  }}
                />
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `rgba(0, 0,0,0.5)`,
  },
  wrapper: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#fffdfa',
    paddingVertical: 10,
    elevation: 15,
  },
  scrollView: {
    flexGrow: 1,
  },
  text: {
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
    color: '#b39262',
    marginHorizontal: 6,
  },
  exitBtn: {
    alignSelf: 'flex-end',
    marginHorizontal: 10,
  },
  sectionHeader: {
    fontFamily: 'Tajawal-Bold',
    fontSize: 20,
    color: '#7d4c02',
    textAlign: 'center',
  },
});

export default QuranTutorialModal;
