import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  useWindowDimensions,
} from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import TrackPlayer, {useProgress} from 'react-native-track-player';
import Card from '../src/components/Card';
import ErrorOverlay from '../src/UI/ErrorOverlay';
import Player from '../src/UI/Player';

const DownloadedSurah = ({navigation}) => {
  const [err, setErr] = useState(false);
  const [tracks, setTracks] = useState([]);
  const {width, height} = useWindowDimensions();
  const getLocalTracks = async () => {
    const localTracks = await AsyncStorage.getItem('tracks');
    if (!localTracks) {
      return setErr(true);
    }
    const finalTracksArr = [];
    const parsedTracks = JSON.parse(localTracks);
    for (const track of parsedTracks) {
      console.log(track);
      const isExist = await RNFetchBlob.fs.exists(track.url);
      console.log(isExist);
      if (isExist) {
        finalTracksArr.push({
          ...track,
          url: `file://${track.url}`,
          id: Math.random() + Math.random(),
          readId: Math.random(),
        });
      }
    }
    console.log(finalTracksArr);
    setTracks(finalTracksArr);
  };

  const playLocalTrack = async trackIndex => {
    await TrackPlayer.reset();
    await TrackPlayer.add(tracks);
    await TrackPlayer.skip(trackIndex);
    await TrackPlayer.play();
  };

  const progress = useProgress();
  useEffect(() => {
    getLocalTracks();
  }, []);
  return (
    <View style={styles.container}>
      {tracks.length === 0 && (
        <ErrorOverlay message="عفوا, لم تقم بتحميل اي سور حتي الان, قم بتحميل سورك المفضله لكي تتمكن من الاستماع لها بدون انترنت" />
      )}
      {tracks.length != 0 && (
        <FlatList
          contentContainerStyle={{
            alignItems: 'center',
          }}
          data={tracks}
          initialNumToRender={tracks.length}
          keyExtractor={item => item.id}
          renderItem={item => {
            return (
              <Card
                CardStyle={[
                  styles.card,
                  {
                    width: width * 0.9,
                    marginTop: item.index === 0 ? 15 : 0,
                    marginBottom: item.index + 1 === tracks.length ? 180 : 0,
                  },
                ]}>
                <Pressable
                  onPress={() => {
                    playLocalTrack(item.index);
                  }}
                  android_ripple={{color: '#FFFFE0'}}
                  style={styles.button}>
                  <Text style={styles.surahName}>{item.item.title}</Text>
                  <Text style={styles.reciter}>{item.item.artist}</Text>
                </Pressable>
              </Card>
            );
          }}
        />
      )}
      <Player value={progress.position} maxValue={progress.duration} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dce8dc',
    justifyContent: 'center',
  },
  wrapper: {
    width: '90%',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    marginBottom: 15,
  },
  button: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  surahName: {
    fontSize: 20,
    color: '#3ad197',
    alignSelf: 'center',
    fontFamily: 'Tajawal-Bold',
    textAlign: 'center',
  },
  reciter: {
    fontSize: 14,
    color: '#3ad197',
    alignSelf: 'center',
    fontFamily: 'Tajawal-Regular',
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default DownloadedSurah;
