import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Modal,
  PermissionsAndroid,
  Alert,
  ToastAndroid,
  Button,
} from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import TrackPlayer, {State, useProgress} from 'react-native-track-player';
import {SurahList} from '../src/Surah';
import Player from '../src/UI/Player';
import SearchBar from '../src/UI/SearchBar';
import SurahItem from '../src/components/SurahItem';
import DownloadOverlay from '../src/UI/DownloadOverlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {requestReview} from '../utils/requestReview';
const Surah = ({route, navigation}) => {
  const {readObject} = route.params;
  const surah_list = readObject.surah_list.split(',');
  const [tracks, setTracks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloading, setDownloading] = useState(false);

  const downloadSurahHandler = async trackObject => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'تحميل القرأن الكريم',
        message:
          'يحتاج التطبيق لأذن الوصول للذاكرة الداخلية حتي يتم تحميل السور',
        buttonNeutral: 'ذكرني لاحقا',
        buttonNegative: 'الغاء',
        buttonPositive: 'حسنا',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const fileName = `${trackObject.title} - ${trackObject.artist}`;
      const url = trackObject.url;
      const path =
        RNFetchBlob.fs.dirs.DownloadDir +
        '/Sabeel' +
        '/القرآن الكريم' +
        '/' +
        readObject?.reciterName +
        '/' +
        `${fileName}.mp3`;
      const isDownloaded = await RNFetchBlob.fs.exists(path);
      if (isDownloaded) {
        return Alert.alert('تم تحميل هذه السوره مسبقا');
      }
      try {
        setDownloading(true);
        RNFetchBlob.config({
          fileCache: true,
          path: path,
        })
          .fetch('GET', url)
          .progress({interval: 250}, (received, total) => {
            setDownloadProgress((received / total) * 100);
          })
          .then(async res => {
            ToastAndroid.showWithGravityAndOffset(
              `تم حفظ السورة في${res.path()}`,
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              10,
              250,
            );
            let savedTracks = [];
            const localTracks = await AsyncStorage.getItem('tracks');
            if (localTracks) {
              const parsedLocalTracks = JSON.parse(localTracks);
              savedTracks = [
                ...parsedLocalTracks,
                {
                  ...trackObject,
                  url: res.path(),
                },
              ];
            } else {
              savedTracks = [{...trackObject, url: res.path()}];
            }
            await AsyncStorage.setItem('tracks', JSON.stringify(savedTracks));
            setDownloadProgress(0);
            setDownloading(false);
            requestReview();
          })
          .catch(err => {
            Alert.alert(
              'حدث خطا ما, قد يكون هذا بسبب عدم وجود مساحة كافية او بطاقة ذاكره خارجية او ان الملف تم تحميله مسبقا',
            );
          });
      } catch (err) {
        Alert.alert(
          'حدث خطا ما, قد يكون هذا بسبب عدم وجود مساحة كافية او بطاقة ذاكره خارجية او ان الملف تم تحميله مسبقا',
        );
      }
    }
  };

  const filterSurahHandler = list => {
    if (searchTerm.trim().length === 0) {
      return list;
    }
    const filteredList = list.filter(
      ele =>
        ele.title.includes(searchTerm) || ele.name_complex.includes(searchTerm),
    );
    return filteredList;
  };

  const playSurahFromList = async surahIndex => {
    const state = await TrackPlayer.getState();
    if (state === State.Playing) {
      const trackIndex = await TrackPlayer.getCurrentTrack();
      const trackObject = await TrackPlayer.getTrack(trackIndex);
      const is_same_reciter =
        trackObject.reciterId === readObject.reciterId &&
        readObject.id === trackObject.readId;
      if (is_same_reciter) {
        await TrackPlayer.skip(surahIndex);
        return;
      }
    }
    await TrackPlayer.reset();
    await TrackPlayer.add(tracks);
    await TrackPlayer.skip(surahIndex);
    await TrackPlayer.play();
  };

  const audioFilesHandler = () => {
    navigation.setOptions({
      headerTitle: readObject?.reciterName,
      headerTitleStyle: {
        color: '#11998e',
        fontSize: 16,
        fontFamily: 'Tajawal-Bold',
      },
    });
    const tracks = [];
    const modified_url = readObject.server.replace('.net', '.net/download');
    surah_list.forEach(surah => {
      const surah_index = parseInt(surah);
      const surah_number = (surah_index / 1000).toFixed(3).split('.')[1];
      const audio_url = `${modified_url}${surah_number}.mp3`;
      const trackObject = {
        artist: readObject?.reciterName,
        artwork: require('../assets/images/player_bg.jpg'),
        url: audio_url,
        title: SurahList[surah_index - 1].name_arabic,
        name_complex: SurahList[surah_index - 1].name_complex,
        id: surah_index,
        reciterId: readObject.reciterId,
        readId: readObject.id,
      };
      tracks.push(trackObject);
      setTracks(tracks);
    });
  };

  const progress = useProgress();

  useLayoutEffect(() => {
    audioFilesHandler();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Modal
        onRequestClose={() => {
          setDownloading(false);
        }}
        visible={downloading}
        transparent
        animationType="fade"
        statusBarTranslucent
        style={{
          flex: 1,
        }}>
        <DownloadOverlay
          percentage={parseInt(downloadProgress)}
          value={parseInt(downloadProgress) / 100}
        />
      </Modal>

      <SearchBar
        value={searchTerm}
        onChangeText={enteredText => setSearchTerm(enteredText)}
        placeholder="البحث عن سورة"
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{width: '100%'}}
        data={filterSurahHandler(tracks)}
        keyExtractor={item => item.id}
        renderItem={item => {
          return (
            <SurahItem
              downloadHandler={() => {
                downloadSurahHandler(item.item);
              }}
              playHandler={() => {
                const trackIndex = tracks.findIndex(
                  track => track.title === item.item.title,
                );
                playSurahFromList(trackIndex);
              }}
              style={{
                marginBottom:
                  item.index + 1 === filterSurahHandler(tracks).length
                    ? 180
                    : 0,
              }}
              name_en={item.item.name_complex}
              surahName={item.item.title}
            />
          );
        }}
      />
      <Player value={progress.position} maxValue={progress.duration} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#dce8dc',
    flex: 1,
    alignItems: 'center',
  },
});
export default Surah;
