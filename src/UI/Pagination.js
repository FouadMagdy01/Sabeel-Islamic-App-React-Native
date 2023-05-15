import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

const Pagination = ({currentPage, maxValue, onPageChange, paginationStyle}) => {
  const [displayedNumbers, setDisplayedNumbers] = React.useState([]);

  const changeDisplayedNumbers = () => {
    let iterations = 0;
    let startNumber;
    const newDisplayedNumbers = [];
    if (currentPage === 1 || currentPage === 2) {
      startNumber = 2;
    }
    if (currentPage === maxValue || currentPage === maxValue - 1) {
      if (maxValue - 3 <= 2) {
        startNumber = 2;
        return;
      }
      startNumber = maxValue - 3;
    }
    if (currentPage > 2 && currentPage < maxValue - 1) {
      startNumber = currentPage - 1;
    }

    for (let i = startNumber; i < maxValue; i++) {
      newDisplayedNumbers.push(i);
      iterations++;
      if (iterations === 3) {
        break;
      }
    }

    setDisplayedNumbers(prev => [1, ...newDisplayedNumbers, maxValue]);
  };
  React.useEffect(() => {
    changeDisplayedNumbers();
  }, [currentPage]);

  return (
    <View style={[styles.container, paginationStyle]}>
      {displayedNumbers.map(number => {
        return (
          <TouchableOpacity
            key={number}
            activeOpacity={0.7}
            style={[
              styles.btn,
              {
                backgroundColor: currentPage === number ? '#2e8077' : '#ebf7f6',
              },
            ]}
            onPress={() => {
              onPageChange(number);
            }}>
            <Text
              style={[
                styles.pageNumber,
                {
                  color: currentPage === number ? '#FFFFE0' : '#2e8077',
                },
              ]}>
              {number}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginHorizontal: 8,
    borderRadius: 8,
  },
  pageNumber: {
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
  },
});
export default Pagination;
