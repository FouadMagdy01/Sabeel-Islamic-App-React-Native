import axios from 'axios';
import React, {useRef, useState, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import TrackPlayer, {Event, State} from 'react-native-track-player';
import {SurahList} from '../Surah';
import Card from './Card';
import Icon, {Icons} from './Icons';
import ShareCopySection from './ShareCopySection';

const VerseDetailsItem = ({
  verseItem,
  selectedReciterId,
  selectedReciterName,
}) => {
  const [playing, setPlaying] = useState(false);
  const listeners = useRef([]);

  const playPauseHandler = async () => {
    if (playing) {
      return TrackPlayer.reset();
    }
    await TrackPlayer.reset();
    const isSpecial = ['11', '6', '12'].findIndex(
      e => e === selectedReciterId.toString(),
    );
    const audioFiles = [];
    const baseUrl = isSpecial > -1 ? 'https:' : 'https://verses.quran.com/';
    const verses = await axios.get(
      `https://api.quran.com/api/v4/recitations/${selectedReciterId}/by_ayah/${verseItem.verse_key}`,
    );
    const splittedKey = verseItem.verse_key.split(':');
    const surahNum = parseInt(splittedKey[0]);
    audioFiles.push({
      url: baseUrl + verses.data.audio_files[0].url,
      verse_key: verseItem.verse_key,
      artist: selectedReciterName,
      title: `الأيه ${splittedKey[1]} ` + SurahList[surahNum - 1].name_arabic,
    });
    await TrackPlayer.add(audioFiles);
    await TrackPlayer.play();
  };
  useEffect(() => {
    listeners.current.push(
      TrackPlayer.addEventListener(Event.PlaybackState, event => {
        if (event.state === State.Playing) {
          setPlaying(prev => true);
        } else {
          setPlaying(prev => false);
        }
      }),
    );

    return () => {
      TrackPlayer.reset();
      listeners.current.forEach(listener => listener.remove());
      listeners.current = [];
    };
  }, [verseItem]);
  return (
    <Card CardStyle={styles.container}>
      <Text style={styles.text}>{verseItem.text_uthmani}</Text>
      <TouchableOpacity
        style={styles.playerBtn}
        onPress={playPauseHandler}
        activeOpacity={0.7}>
        {playing ? (
          <Icon
            type={Icons.Entypo}
            name="controller-paus"
            size={36}
            color="#b39262"
          />
        ) : (
          <Icon
            type={Icons.Entypo}
            name="controller-play"
            size={36}
            color="#b39262"
          />
        )}
      </TouchableOpacity>

      {verseItem.tafseer.map((tafseer, index) => {
        return (
          <View key={index}>
            <View style={styles.separator}>
              <View style={styles.line}></View>
              <Text style={styles.tafseerTitle}>{tafseer.tafseer_name}</Text>
              <View style={styles.line}></View>
            </View>
            <Text style={styles.tafseetText}>{tafseer.text}</Text>
            <ShareCopySection
              iconTitleProps={{
                rippleColor: '#7d6037',
              }}
              buttonsStyle={styles.share_copy_style}
              text={`${tafseer.tafseer_name} لقوله تعالي : ${
                "'" + verseItem.text_uthmani + "'"
              } هو : ${tafseer.text}`}
              shareTitle="شاؤك الأيه والتفسير"
            />
          </View>
        );
      })}
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    marginBottom: 25,
    backgroundColor: '#c7b8a1',
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  text: {
    backgroundColor: '#e8ddd1',
    borderRadius: 10,
    paddingHorizontal: 4,
    fontSize: 24,
    fontFamily: 'quran',
  },
  playerBtn: {alignSelf: 'center'},
  line: {
    flex: 1,
    height: 3,
    backgroundColor: '#b39262',
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tafseerTitle: {
    paddingHorizontal: 7,
    fontSize: 18,
    fontFamily: 'Tajawal-Bold',
    color: '#b39262',
  },
  tafseetText: {
    paddingHorizontal: 4,
    fontSize: 20,
    fontFamily: 'Tajawal-Bold',
    lineHeight: 30,
    marginBottom: 8,
  },
  share_copy_style: {
    backgroundColor: '#b39262',
  },
});

export default VerseDetailsItem;
