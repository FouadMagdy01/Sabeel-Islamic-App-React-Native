import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, ScrollView, Pressable} from 'react-native';
import Icon, {Icons} from '../src/components/Icons';
import Separator from '../src/components/Separator';
import LoadingOverlay from '../src/UI/LoadingOverlay';
import ErrorOverlay from '../src/UI/ErrorOverlay';

const CollectionDetails = ({route, navigation}) => {
  const collection = route.params?.collection;
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);

  console.log(collection);
  const getCollectionBooks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://api.sunnah.com/v1/collections/${collection?.name}/books?limit=100`,
        {
          headers: {
            'X-API-Key': 'SqD712P3E82xnwOAEOkGd5JZH8s9wRR24TqNFzjk',
          },
        },
      );
      console.log(res.data);
      setLoading(false);
      setBooks(res.data.data);
    } catch (err) {
      setLoading(false);
      setErr(true);
    }
  };

  useEffect(() => {
    getCollectionBooks();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      style={styles.container}>
      <View
        style={{
          width: '90%',
          flex: 1,
        }}>
        <View style={styles.collectionDetailsContainer}>
          <View>
            <Icon
              style={styles.icon}
              color="#4ebfb4"
              type={Icons.FontAwesome5}
              name="book"
              size={80}
            />
          </View>
          <View
            style={{
              flex: 1,
            }}>
            <Text style={styles.text}>{collection.collection[1].title}</Text>
            <Text style={styles.subText}>
              <Text style={styles.subTextSection}>اجمالي الاحاديث: </Text>
              {collection.totalHadith}
            </Text>
            <Text style={styles.subText}>
              <Text style={styles.subTextSection}>الاحاديث المتوفرة: </Text>
              {collection.totalAvailableHadith}
            </Text>
          </View>
        </View>
        <Separator textStyle={styles.text} text="الكتب" lineColor="#2e8077" />
        {loading && <LoadingOverlay message="جاري تحميل الكتب" />}
        {err && (
          <ErrorOverlay message="حدث خطأ ما اثناء تحميل الكتب. الرجاء المحاولة لاحقا" />
        )}

        {books.length != 0 &&
          books.map((book, index) => {
            return (
              <View
                key={index}
                style={[
                  styles.bookCardContainer,
                  {
                    marginBottom: index + 1 === books.length ? 20 : 0,
                  },
                ]}>
                <Pressable
                  onPress={() => {
                    navigation.navigate('Hadith', {
                      collectionName: collection.name,
                      bookNumber: book.bookNumber,
                    });
                  }}
                  android_ripple={{
                    color: '#ffffe6',
                    borderless: false,
                  }}
                  style={styles.bookCardBtn}>
                  <Text style={styles.bookTitle}>
                    {book.bookNumber}- {book.book[1].name}
                  </Text>
                  <Text style={styles.subText}>
                    <Text style={styles.subTextSection}>عدد الاحاديث: </Text>
                    {book.numberOfHadith}
                  </Text>
                  <Text style={styles.subText}>
                    <Text style={styles.subTextSection}> من الحديث رقم: </Text>
                    {book.hadithStartNumber}
                  </Text>
                  <Text style={styles.subText}>
                    <Text style={styles.subTextSection}> الي الحديث رقم: </Text>
                    {book.hadithEndNumber}
                  </Text>
                </Pressable>
              </View>
            );
          })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  collectionDetailsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#d1ebe9',
    paddingHorizontal: 5,
    paddingVertical: 20,
    borderRadius: 15,
    overflow: 'hidden',
    marginTop: 15,
    elevation: 10,
  },
  scrollContainer: {
    alignItems: 'center',
    flexGrow: 1,
  },
  text: {
    fontSize: 20,
    fontFamily: 'Tajawal-Bold',
    color: '#2e8077',
  },
  bookTitle: {
    fontSize: 18,
    fontFamily: 'Tajawal-Bold',
    color: '#2e8077',
  },
  subTextSection: {
    fontSize: 14,
    fontFamily: 'Tajawal-Bold',
    color: '#3fa199',
  },
  subText: {
    fontSize: 14,
    fontFamily: 'Tajawal-Regular',
    color: '#0b7064',
  },
  bookCardContainer: {
    borderRadius: 10,
    elevation: 8,
    backgroundColor: '#ebf7f6',
    overflow: 'hidden',
    marginTop: 15,
  },
  bookCardBtn: {
    paddingHorizontal: 5,
    paddingVertical: 8,
  },
});
export default CollectionDetails;
