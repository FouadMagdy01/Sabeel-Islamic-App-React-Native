import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, ScrollView, FlatList} from 'react-native';
import BookFatwaCard from '../src/components/BookFatwaCard';
import ErrorOverlay from '../src/UI/ErrorOverlay';
import LoadingOverlay from '../src/UI/LoadingOverlay';
import Pagination from '../src/UI/Pagination';

const Books = ({navigation}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [books, setBooks] = useState([]);
  const [maxNumber, setMaxNumber] = useState(25);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);

  function removeHtmlTagsAndNonArabicChars(text) {
    var cleanText = text.replace(/<[^>]*>/g, '');
    return cleanText;
  }

  const getBooks = async () => {
    setBooks([]);
    setLoading(true);
    try {
      const books = [];
      const response = await axios.get(
        `https://api3.islamhouse.com/v3/paV29H2gm56kvLPy/main/books/ar/ar/${currentPage}/25/json`,
      );
      response.data.data.forEach(book => {
        book.attachments.forEach(attachment => {
          if (attachment.extension_type === 'PDF') {
            books.push({
              bookTitle: book.title,
              bookDesc: removeHtmlTagsAndNonArabicChars(book.description),
              authors: book.prepared_by,
              url: attachment.url,
              id: (book.id + book.add_date) * Math.random(),
              size: attachment.size,
              fileType: attachment.extension_type,
            });
          }
        });
      });
      setBooks(books);
      setMaxNumber(response.data.links.pages_number);
    } catch (err) {
      setErr(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    getBooks();
  }, [currentPage]);
  return (
    <View style={styles.container}>
      {loading && <LoadingOverlay message="جاري تحميل الكتب والمقالات" />}
      {err && (
        <ErrorOverlay message="حدث خطأ اثناء تحميل الكتب, تأكد من وجود اتصال بالانترنت وأعد المحاولة لاحقا" />
      )}
      {books.length != 0 && (
        <FlatList
          ListFooterComponentStyle={{
            marginBottom: 20,
          }}
          ListFooterComponent={() => {
            return (
              <Pagination
                currentPage={currentPage}
                onPageChange={newPage => {
                  setCurrentPage(newPage);
                }}
                maxValue={maxNumber}
              />
            );
          }}
          contentContainerStyle={{
            alignItems: 'center',
            flexGrow: 1,
          }}
          data={books}
          renderItem={book => {
            return (
              <BookFatwaCard
                fileType={book.item.fileType}
                onPress={() => {
                  navigation.navigate('PdfReader', {
                    pdfUrl: book.item.url,
                  });
                }}
                cardStyle={{
                  marginTop: 20,
                  marginBottom: book.index + 1 === books.length ? 20 : 0,
                }}
                name={book.item.bookTitle}
                desc={book.item.bookDesc}
                authors={book.item.authors}
                size={book.item.size}
              />
            );
          }}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
});

export default Books;
