import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  useWindowDimensions,
  FlatList,
} from 'react-native';
import Card from '../src/components/Card';

import ShareCopySection from '../src/components/ShareCopySection';
import ErrorOverlay from '../src/UI/ErrorOverlay';
import LoadingOverlay from '../src/UI/LoadingOverlay';
const Hadith = ({route}) => {
  const collectionName = route.params?.collectionName;
  const bookNumber = route.params?.bookNumber;
  const [hadiths, setHadiths] = useState([]);
  const {width, height} = useWindowDimensions();
  const [page, setPage] = useState(1);
  const [next, setNext] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  function removeHtmlTagsAndNonArabicChars(text, removeEnglish) {
    var cleanText = text.replace(/<[^>]*>/g, '');

    var arabicText = cleanText.replace(
      /[^\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]+/g,
      ' ',
    );
    return removeEnglish ? arabicText : cleanText;
  }

  const getCollectionBooks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.sunnah.com/v1/collections/${collectionName}/books/${bookNumber}/hadiths?page=${page}`,
        {
          headers: {
            'X-API-Key': 'SqD712P3E82xnwOAEOkGd5JZH8s9wRR24TqNFzjk',
          },
        },
      );
      setNext(res.data.next);
      setHadiths(res.data.data);
    } catch (err) {
      setErr(true);
    }
    setLoading(false);
  };

  const onEndReached = async () => {
    if (next) {
      setLoading(true);
      try {
        const newPage = page + 1;
        setPage(newPage);
        const res = await axios.get(
          `https://api.sunnah.com/v1/collections/${collectionName}/books/${bookNumber}/hadiths?page=${newPage}`,
          {
            headers: {
              'X-API-Key': 'SqD712P3E82xnwOAEOkGd5JZH8s9wRR24TqNFzjk',
            },
          },
        );
        setNext(res.data.next);
        setHadiths(prev => [...prev, ...res.data.data]);
        setErr(false);
      } catch (err) {
        setErr(true);
      }
      setLoading(false);
    }
  };
  useEffect(() => {
    getCollectionBooks();
  }, []);

  return (
    <View style={styles.container}>
      {hadiths.length === 0 && loading && (
        <LoadingOverlay message="جاري تحميل الاحاديث" />
      )}
      {hadiths.length === 0 && err && (
        <ErrorOverlay message="حدث خطأ اثناء تحميل الاحاديث, تأكد من اتصالك بالانترنت وأعد المحاولة لاحقا" />
      )}
      {hadiths.length != 0 && (
        <FlatList
          ListFooterComponent={() => {
            return (
              <View>
                {hadiths.length > 0 && loading && (
                  <LoadingOverlay message="جاري تحميل المزيد من الاحاديث" />
                )}
                {hadiths.length > 0 && err && (
                  <ErrorOverlay message="حدث خطأ اثناء تحميل باقي الاحاديث, أعد المحاولة لاحقا او قم باعادة الدخول الي الصفحة" />
                )}
              </View>
            );
          }}
          contentContainerStyle={styles.listContainerStyle}
          onEndReached={onEndReached}
          data={hadiths}
          keyExtractor={item => item.hadithNumber}
          renderItem={(item, index) => {
            const hadithBody = removeHtmlTagsAndNonArabicChars(
              item.item.hadith[1].body,
              bookNumber === '1' && collectionName === 'bukhari' && true,
            );
            return (
              <Card CardStyle={[styles.card, {width: 0.9 * width}]}>
                <Text style={styles.hadithNumber}>
                  {'( '}
                  {item.item.hadithNumber}
                  {' )'}
                </Text>
                <Text style={styles.hadithText}>{hadithBody}</Text>
                <ShareCopySection
                  text={hadithBody}
                  shareTitle="شارك هذا الحديث"
                />
                {item.item.hadith[1].grades.length != 0 && (
                  <View>
                    <View style={styles.line}></View>
                    <Text style={styles.hadithGrade}>
                      منزلة الحديث : {item.item.hadith[1].grades[0].grade}
                    </Text>
                  </View>
                )}
              </Card>
            );
          }}
        />
      )}
      {hadiths.length > 0 && loading && (
        <LoadingOverlay message="جاري تحميل المزيد من الاحاديث" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dce8dc',
  },
  listContainerStyle: {
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    marginVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 16,
  },
  hadithNumber: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    fontFamily: 'Roboto-Bold',
    color: '#0a5b55',
  },
  hadithText: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: 'Tajawal-ExtraBold',
    lineHeight: 36,
    color: '#0a5b55',
  },
  buttonsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  line: {
    height: 2,
    backgroundColor: '#0a5b55',
    flex: 1,
    marginBottom: 5,
  },
  btnContainerStyle: {
    maxWidth: '75%',
    marginBottom: 10,
  },
  hadithGrade: {
    fontSize: 16,
    fontFamily: 'Tajawal-Bold',
    marginBottom: 8,
    color: '#0a5b55',
  },
});

export default Hadith;
