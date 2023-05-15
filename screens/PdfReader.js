import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Pdf from 'react-native-pdf';
import LoadingOverlay from '../src/UI/LoadingOverlay';

const PdfReader = ({route}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const pdfUrl = route.params?.pdfUrl;
  return (
    <View style={styles.container}>
      <Pdf
        onLoadComplete={numberOfPages => {
          setTotalPages(numberOfPages);
        }}
        onPageChanged={(page, numberOfPages) => {
          setCurrentPage(page);
        }}
        renderActivityIndicator={() => {
          return (
            <LoadingOverlay message="الرجاء الانتظار حتي يتم تحميل الكتاب" />
          );
        }}
        enablePaging={true}
        source={{
          uri: pdfUrl,
          cache: false,
        }}
        style={{flex: 1, backgroundColor: 'white'}}
      />
      <Text style={styles.paginationText}>
        {currentPage}
        {' / '}
        {totalPages}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  paginationText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    fontFamily: 'Roboto-Bold',
    color: '#0a5b55',
  },
});

export default PdfReader;
