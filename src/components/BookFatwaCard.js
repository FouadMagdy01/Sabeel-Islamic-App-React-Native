import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import Card from './Card';
import Icon, {Icons} from './Icons';

const BookFatwaCard = ({
  name,
  authors,
  desc,
  cardStyle,
  onPress,
  size,
  fileType,
  fatwa,
}) => {
  const {width} = useWindowDimensions();
  return (
    <Card
      CardStyle={[
        styles.card,
        ,
        {
          width: width * 0.9,
        },
        cardStyle,
      ]}>
      <Pressable
        onPress={onPress}
        style={styles.btn}
        android_ripple={{
          color: '#ffffe6',
          borderless: false,
        }}>
        <Icon
          type={Icons.MaterialCommunityIcons}
          name="file-pdf-box"
          color="#0b7064"
          size={60}
        />
        <View
          style={{
            flex: 1,
          }}>
          <Text style={styles.subSection}>
            <Text style={styles.section}>
              اسم {!fatwa ? 'الكتاب' : 'الفتوي'}:{' '}
            </Text>{' '}
            {name}
          </Text>
          <View style={styles.line}></View>
          <Text style={styles.subSection}>
            <Text style={styles.section}>المؤلفون: </Text>
            {authors.map((author, index) => {
              return (
                <Text key={index} style={styles.subSection}>
                  {author.title}
                  {','}
                </Text>
              );
            })}
          </Text>
          <View style={styles.line}></View>
          <Text style={styles.subSection}>
            <Text style={styles.section}>
              وصف {!fatwa ? 'الكتاب' : 'الفتوي'}:{' '}
            </Text>{' '}
            {desc}
          </Text>
          <View style={styles.line}></View>
          <Text style={styles.subSection}>
            <Text style={styles.section}>حجم {'الملف'}: </Text> {size}
          </Text>
          <View style={styles.line}></View>
          <Text style={styles.subSection}>
            <Text style={styles.section}>صيغة الملف: </Text> {fileType}
          </Text>
        </View>
      </Pressable>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    backgroundColor: '#ebf7f6',
  },
  btn: {
    flexGrow: 1,
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  section: {
    fontFamily: 'Tajawal-Bold',
    color: '#0a5b55',
    fontSize: 18,
    lineHeight: 25,
  },
  subSection: {
    fontFamily: 'Tajawal-Medium',
    color: '#0a5b55',
    fontSize: 16,
    lineHeight: 25,
  },
  line: {
    width: '50%',
    height: 2,
    backgroundColor: '#0a5b55',
    alignSelf: 'flex-end',
    marginVertical: 6,
  },
});

export default BookFatwaCard;
