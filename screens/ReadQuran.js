import React, {useState, useEffect, useRef, useLayoutEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Alert,
  Modal,
  Text,
  TouchableOpacity,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import RNFetchBlob from 'react-native-fetch-blob';
import BottomSheet from '../src/UI/BottomSheet';
import SurahBeginning from '../src/components/SurahBeginning';
import {SurahList} from '../src/Surah';
import axios from 'axios';
import TrackPlayer from 'react-native-track-player';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TitleHeader from '../src/components/TitleHeader';
import IconTitleButton from '../src/components/IconTitleButton';
import Icon, {Icons} from '../src/components/Icons';
import VersesDetailsModal from '../src/UI/VersesDetailsModal';
import QuranTutorialModal from '../src/UI/QuranTutorial';
import BookmarkModal from '../src/UI/BookmarksModal';
import Separator from '../src/components/Separator';
import {color} from 'react-native-reanimated';
const ReadQuran = ({navigation}) => {
  const [fontSize, setFontSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(null);
  const [selecting, setSelecting] = useState(false);
  const [currentPlayingVerse, setCurrentPlayingVerse] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVerses, setSelectedVerses] = useState([]);
  const [bookmarksModal, setBookmarksModal] = useState(false);
  const [tutorial, setTutorial] = useState(false);
  const addTafseerToList = async (tafseerId, tafseer_name) => {
    const isExisted = selectedVerses.some(verse => {
      return verse.tafseer.some(tafseer => {
        return tafseer.tafseer_name === tafseer_name;
      });
    });
    if (isExisted) {
      return;
    }
    let updatedVersesCount = 0;
    const verses = [];
    const updatedVerses = selectedVerses.forEach(async verse => {
      const splittedKey = verse.verse_key.split(':');
      const surahNum = splittedKey[0];
      const ayahNum = splittedKey[1];
      const newTafseer = await axios.get(
        `http://api.quran-tafseer.com/tafseer/${tafseerId}/${surahNum}/${ayahNum}`,
      );
      updatedVersesCount = updatedVersesCount + 1;
      const newVerseObj = {
        ...verse,
        tafseer: [
          ...verse.tafseer,
          {
            tafseer_name: newTafseer.data.tafseer_name,
            text: newTafseer.data.text,
          },
        ],
      };
      verses.push(newVerseObj);
      if (updatedVersesCount === selectedVerses.length) {
        setSelectedVerses(verses);
      }
    });
  };
  const fontSizeChange = type => {
    if (type === 'plus') {
      fontSize === 50 ? setFontSize(50) : setFontSize(fontSize + 2);
    } else {
      fontSize === 16 ? setFontSize(16) : setFontSize(fontSize - 2);
    }
  };

  const selectTextHandler = verse => {
    if (!selecting) {
      return;
    }
    if (
      selectedVerses.filter(e => e.verse_key === verse.verse_key).length != 0
    ) {
      const filteredVerses = selectedVerses.filter(
        e => e.verse_key != verse.verse_key,
      );
      setSelectedVerses(filteredVerses);
    } else {
      setSelectedVerses(prev => [...prev, verse]);
    }
  };

  const playPageVerses = async (reciterId, reciterName) => {
    const isSpecial = ['11', '6', '12'].findIndex(
      e => e === reciterId.toString(),
    );
    await TrackPlayer.reset();
    const audioFiles = [];
    const baseUrl = isSpecial > -1 ? 'https:' : 'https://verses.quran.com/';
    const verses = await axios.get(
      `https://api.quran.com/api/v4/verses/by_page/${currentPage}?audio=${reciterId}`,
    );
    verses.data.verses.forEach(verse => {
      const splittedKey = verse.verse_key.split(':');
      const surahNum = parseInt(splittedKey[0]);
      audioFiles.push({
        url: baseUrl + verse.audio.url,
        verse_key: verse.verse_key,
        artist: reciterName,
        title: `الأيه ${splittedKey[1]} ` + SurahList[surahNum - 1].name_arabic,
      });
    });
    await TrackPlayer.add(audioFiles);
    await TrackPlayer.play();
  };

  const getQuranData = async () => {
    const lastRead = await AsyncStorage.getItem('lastPage');
    if (lastRead) {
      setCurrentPage(parseInt(lastRead));
    }
    const path = RNFetchBlob.fs.asset('quran_data_by_page.json');
    const file = await RNFetchBlob.fs.readFile(path, 'utf8');
    const parsedFile = JSON.parse(file);
    setPages(parsedFile);
    const launched = await AsyncStorage.getItem('quranTutorial');
    if (!launched) {
      await AsyncStorage.setItem('quranTutorial', 'done');
      setTutorial(true);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: props =>
        selectedVerses.length != 0 ? (
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}>
            <IconTitleButton
              onPress={() => {
                setModalVisible(true);
              }}
              buttonTitle="عرض تفاصيل الايات"
              iconStyle={{
                color: '#faf3eb',
              }}
              rippleColor="#5B2B2B"
              btnContainerStyle={styles.headerBtn}
              type={Icons.Entypo}
              name="info-with-circle"
              size={36}
            />
          </View>
        ) : (
          <TitleHeader title="Sabeel" titleColor="#b39262" {...props} />
        ),

      headerStyle: {
        backgroundColor: '#e3d6c3',
        elevation: 12,
        shadowColor: '#b39262',
      },
      headerTintColor: '#b39262',
      headerShown: true,
      headerRight: props =>
        selectedVerses.length === 0 && (
          <View
            style={{
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              onPress={() => {
                setTutorial(true);
              }}
              activeOpacity={0.7}
              style={{
                marginRight: 12,
              }}>
              <Icon
                name="help-with-circle"
                type={Icons.Entypo}
                color="#b39262"
                size={36}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setBookmarksModal(true);
              }}
              activeOpacity={0.7}
              style={{
                marginRight: 12,
              }}>
              <Icon
                name="bookmark"
                type={Icons.FontAwesome}
                color="#b39262"
                size={36}
              />
            </TouchableOpacity>
          </View>
        ),
    });
  }, [selecting, selectedVerses, navigation]);

  useEffect(() => {
    getQuranData();
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView
        showsPagination={false}
        loop={false}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          marginHorizontal: 5,
        }}>
        <Modal
          statusBarTranslucent
          animationType="slide"
          onRequestClose={() => {
            setModalVisible(false);
          }}
          style={{
            flex: 1,
          }}
          transparent
          visible={modalVisible}>
          <VersesDetailsModal
            closeModal={() => {
              setModalVisible(false);
            }}
            addTafseerToList={addTafseerToList}
            verses={selectedVerses}
          />
        </Modal>
        <Modal
          statusBarTranslucent
          animationType="fade"
          onRequestClose={() => {
            setTutorial(false);
          }}
          transparent
          visible={tutorial}>
          <QuranTutorialModal
            closeModal={() => {
              setTutorial(false);
            }}
          />
        </Modal>
        <Modal
          statusBarTranslucent
          animationType="fade"
          onRequestClose={() => {
            setBookmarksModal(false);
          }}
          transparent
          visible={bookmarksModal}>
          <BookmarkModal
            navigateToBookMarkPage={pageNumber => {
              setCurrentPage(pageNumber);
            }}
            closeModal={() => {
              setBookmarksModal(false);
            }}
          />
        </Modal>
        {pages && (
          <Animatable.Text>
            {pages[currentPage].map((ayah, index) => {
              return (
                <Animatable.Text
                  onPress={selectTextHandler.bind(this, ayah)}
                  key={index}>
                  {ayah.verse_key.split(':')[1] === '1' ? (
                    <SurahBeginning
                      surahName={
                        SurahList[parseInt(ayah.verse_key.split(':')[0]) - 1]
                          .name_arabic
                      }
                    />
                  ) : null}
                  {ayah.verse_key === '1:1' ? null : (
                    <Animatable.Text
                      transition="fontSize"
                      style={{
                        fontSize,
                        fontFamily: 'quran',
                        backgroundColor:
                          currentPlayingVerse === ayah.verse_key
                            ? '#e0d5c5'
                            : selectedVerses.filter(
                                v => v.verse_key === ayah.verse_key,
                              ).length != 0
                            ? '#dce8dc'
                            : null,
                      }}>
                      {ayah.text_uthmani}
                      <Animatable.Text
                        style={{
                          fontFamily: 'Roboto-Bold',
                          fontSize: 16,
                        }}>
                        {`( ${ayah.verse_number} ) ${
                          ayah.verse_number ===
                          SurahList[parseInt(ayah.verse_key.split(':')[0]) - 1]
                            .verses_count
                            ? '\n'
                            : ''
                        }`}
                      </Animatable.Text>
                    </Animatable.Text>
                  )}
                </Animatable.Text>
              );
            })}
          </Animatable.Text>
        )}
        <Separator
          lineColor="black"
          textStyle={styles.pageNum}
          circle={true}
          text={currentPage}
        />
      </ScrollView>
      <BottomSheet
        selecting={selecting}
        switchMode={() => {
          if (selecting) {
            setSelectedVerses([]);
            setSelecting(false);
            return;
          }
          setSelecting(true);
        }}
        decreaseFontSize={fontSizeChange.bind(this, 'minus')}
        increaseFontSize={fontSizeChange.bind(this, 'plus')}
        fontSize={fontSize}
        navigateToPage={async page => {
          await AsyncStorage.setItem('lastPage', page.toString());
          setCurrentPage(page);
        }}
        onAyahChange={trackObject => {
          if (trackObject != null) {
            const verse_key = trackObject?.verse_key;
            setCurrentPlayingVerse(verse_key);
          }
        }}
        forward={async () => {
          if (currentPage < 604) {
            const newPage = currentPage + 1;
            setCurrentPage(newPage);
            await AsyncStorage.setItem('lastPage', newPage.toString());
          }
        }}
        backward={async () => {
          if (currentPage != 1) {
            const newPage = currentPage - 1;
            setCurrentPage(newPage);
            await AsyncStorage.setItem('lastPage', newPage.toString());
          }
        }}
        playPageVerses={playPageVerses}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8EE',
  },
  pageNum: {
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    color: 'black',
  },
  btns: {
    width: '70%',
    bottom: 0,
    backgroundColor: 'black',
    paddingVertical: 10,
  },
  headerBtn: {
    backgroundColor: '#b39262',
    height: 40,
  },
});

export default ReadQuran;
