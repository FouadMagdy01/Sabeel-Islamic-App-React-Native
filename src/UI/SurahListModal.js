import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Pressable,
} from 'react-native';
import {tutorial} from '../../data/tutorial';
import Icon, {Icons} from '../components/Icons';
import {SurahList} from '../Surah';
import SearchBar from './SearchBar';
const SurahListModal = ({closeModal, navigateToPage}) => {
  const {width, height} = useWindowDimensions();
  const [query, setQuery] = useState('');
  const filterSurahHandler = list => {
    if (query.trim().length === 0) {
      return list;
    }
    const filteredList = list.filter(
      ele =>
        ele.name_arabic.includes(query) || ele.name_complex.includes(query),
    );
    return filteredList;
  };
  return (
    <View style={styles.container}>
      <View
        style={[styles.wrapper, {height: height * 0.8, width: width * 0.9}]}>
        <TouchableOpacity onPress={closeModal} style={styles.exitBtn}>
          <Icon
            name="remove"
            type={Icons.FontAwesome}
            size={38}
            color="#b39262"
          />
        </TouchableOpacity>
        <SearchBar
          iconColor="#b39262"
          inputStyle={{
            color: '#b39262',
          }}
          placeholderTextColor="#b39262"
          placeholder="ابحث عن سوره"
          value={query}
          onChangeText={enteredValue => setQuery(enteredValue)}
        />
        <FlatList
          contentContainerStyle={{
            alignItems: 'center',
          }}
          data={filterSurahHandler(SurahList)}
          renderItem={item => {
            return (
              <View
                style={{
                  borderRadius: 12,
                  overflow: 'hidden',
                  width: width * 0.8,
                  marginTop: 10,
                }}>
                <Pressable
                  onPress={() => {
                    navigateToPage(item.item.pages[0]);
                    closeModal();
                  }}
                  android_ripple={{
                    color: '#ccbba3',
                  }}
                  style={[styles.btn]}>
                  <Text style={styles.text}>{item.item.name_complex}</Text>

                  <Text style={styles.text}>{item.item.name_arabic}</Text>
                </Pressable>
              </View>
            );
          }}
          keyExtractor={item => item.id}
        />
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
    alignItems: 'center',

    backgroundColor: '#fffdfa',
    paddingVertical: 10,
    elevation: 15,
  },

  text: {
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
    color: 'white',
  },
  exitBtn: {
    alignSelf: 'flex-end',
    marginHorizontal: 10,
  },

  btn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    paddingVertical: 12,
    backgroundColor: '#b39262',
    flex: 1,
  },
});

export default SurahListModal;
