import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Dimensions,
  Pressable,
} from 'react-native';

import axios from 'axios';
import Icon, {Icons} from '../src/components/Icons';
import LoadingOverlay from '../src/UI/LoadingOverlay';
import ErrorOverlay from '../src/UI/ErrorOverlay';
const {width, height} = Dimensions.get('window');

const Sunnah = ({navigation}) => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);

  const getHadith = async () => {
    const exclusion = ['darimi', 'nawawi40', 'malik'];
    try {
      setLoading(true);
      const res = await axios.get(`https://api.sunnah.com/v1/collections`, {
        headers: {
          'X-API-Key': 'SqD712P3E82xnwOAEOkGd5JZH8s9wRR24TqNFzjk',
        },
      });
      const dataToDisplay = res.data.data.filter(e => {
        if (exclusion.includes(e.name)) {
          return false;
        }
        return true;
      });
      setLoading(false);
      console.log(dataToDisplay);
      setCollections(dataToDisplay);
    } catch (err) {
      setLoading(false);
      setErr(true);
    }
  };
  useEffect(() => {
    getHadith();
  }, []);
  return (
    <View style={styles.container}>
      {loading && <LoadingOverlay message="جاري تحميل الكتب" />}
      {err && (
        <ErrorOverlay message="حدث خطأ ما اثناء تحميل الكتب. الرجاء المحاولة لاحقا" />
      )}
      {collections.length != 0 && (
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: 'center',
          }}
          data={collections}
          keyExtractor={item => item.name}
          renderItem={(item, index) => {
            return (
              <View
                style={[
                  styles.collectionCardContainer,
                  {
                    marginBottom:
                      item.index + 1 === collections.length ? 20 : 0,
                  },
                ]}>
                <Pressable
                  onPress={() => {
                    navigation.navigate('CollectionDetails', {
                      collection: item.item,
                    });
                  }}
                  android_ripple={{
                    color: '#ffffe6',
                  }}
                  style={styles.collectionCard}>
                  <Icon
                    style={styles.icon}
                    color="#4ebfb4"
                    type={Icons.FontAwesome5}
                    name="book"
                    size={80}
                  />
                  <View style={styles.textContainer}>
                    <Text style={styles.text}>
                      {item.item.collection[1].title}
                    </Text>
                    <Text style={styles.subText}>
                      <Text style={styles.subTextSection}>
                        اجمالي الاحاديث:{' '}
                      </Text>
                      {item.item.totalHadith}
                    </Text>
                    <Text style={styles.subText}>
                      <Text style={styles.subTextSection}>
                        الاحاديث المتوفرة:{' '}
                      </Text>
                      {item.item.totalAvailableHadith}
                    </Text>
                  </View>
                </Pressable>
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  collectionCardContainer: {
    overflow: 'hidden',
    width: width * 0.9,
    backgroundColor: '#ebf7f6',
    borderRadius: 20,
    elevation: 8,
    marginTop: 20,
  },
  collectionCard: {
    flexDirection: 'row',
    paddingVertical: 25,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardIcon: {
    alignItems: 'center',
    width: '100%',
  },
  icon: {
    marginHorizontal: 8,
  },
  textContainer: {
    marginRight: 8,
  },
  text: {
    fontSize: 20,
    fontFamily: 'Tajawal-Bold',
    color: '#2e8077',
  },
  subText: {
    fontSize: 14,
    fontFamily: 'Tajawal-Medium',
    color: '#4ebfb4',
  },
  subTextSection: {
    fontSize: 14,
    fontFamily: 'Tajawal-ExtraBold',
    color: '#4ebfb4',
  },

  header: {
    fontSize: 20,
    fontFamily: 'Tajawal-Bold',
    color: '#2e8077',
    textAlign: 'right',
    marginTop: 8,
  },
});

export default Sunnah;
