import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, FlatList, TouchableOpacity} from 'react-native';
import ReciterItem from '../src/components/ReciterItem';
import axios from 'axios';
import LoadingOverlay from '../src/UI/LoadingOverlay';
import SearchBar from '../src/UI/SearchBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useLayoutEffect} from 'react';
import TitleHeader from '../src/components/TitleHeader';
import Icon, {Icons} from '../src/components/Icons';
import ErrorOverlay from '../src/UI/ErrorOverlay';

const Listen = ({navigation}) => {
  const [reciters, setReciters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [displayFav, setDisplayFav] = useState(false);
  const [err, setErr] = useState(false);
  const getFavoriteReciters = async () => {
    const favorites = await AsyncStorage.getItem('favorites');
    if (favorites) {
      setFavorites(JSON.parse(favorites));
    }
  };

  const addToFavorites = async item => {
    const reciterIndex = favorites.findIndex(e => e === item.id);
    if (reciterIndex < 0) {
      const updatedFavorites = [...favorites, item.id];
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setFavorites(prev => updatedFavorites);
    } else {
      const updatedFavorites = favorites.filter(e => e != item.id);
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setFavorites(prev => updatedFavorites);
    }
  };

  const reciterSearchHandler = recitersList => {
    if (displayFav) {
      const favoriteReciters = recitersList.filter(e =>
        favorites.includes(e.id),
      );
      return favoriteReciters;
    }
    if (searchTerm.trim().length === 0) {
      return recitersList;
    }
    const filteredReciters = recitersList.filter(reciter =>
      reciter.reciterName.includes(searchTerm),
    );
    return filteredReciters;
  };

  const getRecitersList = async () => {
    setLoading(true);
    try {
      const reciters = [];
      const response = await axios.get(
        'https://www.mp3quran.net/api/v3/reciters?language=ar',
      );

      response.data.reciters.forEach(element => {
        element.moshaf.forEach(read => {
          reciters.push({
            ...read,
            reciterId: element.id,
            reciterName: element.name,
          });
        });
      });
      setReciters(reciters);
    } catch (err) {
      setErr(true);
    }
    setLoading(false);
  };

  const handleReciterItemPress = readObject => {
    navigation.navigate('Surah', {
      readObject: readObject,
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <TitleHeader
          titleColor="#11998e"
          title={displayFav ? 'المفضله' : 'كل القراء'}
        />
      ),
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            setDisplayFav(prev => !prev);
          }}
          style={styles.headerBtn}>
          {displayFav ? (
            <Icon
              color="#11998e"
              type={Icons.AntDesign}
              name="heart"
              size={24}
            />
          ) : (
            <Icon
              color="#11998e"
              type={Icons.AntDesign}
              name="hearto"
              size={24}
            />
          )}
          <Text style={styles.headerBtnText}>{'المفضلة'}</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, displayFav]);

  useEffect(() => {
    getFavoriteReciters();
  }, []);
  useEffect(() => {
    getRecitersList();
  }, []);
  return (
    <View style={styles.container}>
      {loading && (
        <LoadingOverlay message="الرجاء الانتظار حتي يتم تحميل القراء" />
      )}
      {err && (
        <ErrorOverlay message="حدث خطأ اثناء تحميل القراء, تأكد من اتصالك بالانترنت وأعد المحاولة لاحقا" />
      )}
      {reciters.length != 0 && (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
          }}>
          <SearchBar
            placeholder="البحث عن قارئ"
            value={searchTerm}
            onChangeText={enteredText => {
              setSearchTerm(prev => enteredText);
            }}
          />
          <FlatList
            style={{
              width: '100%',
            }}
            key={1}
            initialNumToRender={reciters.length}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id}
            data={reciterSearchHandler(reciters)}
            renderItem={reciter => {
              return (
                <ReciterItem
                  isFavorite={
                    favorites.filter(e => e === reciter.item.id).length > 0
                  }
                  addToFavorites={addToFavorites.bind(this, reciter.item)}
                  onPress={handleReciterItemPress.bind(this, reciter.item)}
                  style={{
                    marginBottom:
                      reciter.index + 1 ===
                      reciterSearchHandler(reciters).length
                        ? 20
                        : 0,
                  }}
                  moshaf={reciter.item.name}
                  reciterName={reciter.item.reciterName}
                />
              );
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dce8dc',
  },
  headerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBtnText: {
    color: '#11998e',
    fontSize: 16,
    fontFamily: 'Tajawal-Bold',
    marginHorizontal: 6,
  },
});

export default Listen;
