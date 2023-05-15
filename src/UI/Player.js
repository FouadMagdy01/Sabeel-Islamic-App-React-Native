import {TimeCalculator} from '../../utils/Time';
import React, {useState, useEffect, useRef} from 'react';
import Slider from '@react-native-community/slider';
import Icon, {Icons} from '../../src/components/Icons';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Card from '../components/Card';
import TrackPlayer, {Event, State} from 'react-native-track-player';
const Player = ({value, maxValue}) => {
  const [playing, setPlaying] = useState(false);
  const [surahName, setSurahName] = useState('');
  const [reciterName, setReciterName] = useState('');

  const listeners = useRef([]);

  const playPauseHandler = async () => {
    if (playing) {
      return await TrackPlayer.pause();
    }
    await TrackPlayer.play();
  };

  const getPlayerState = async () => {
    const state = await TrackPlayer.getState();
    if (state === State.Playing) {
      setPlaying(true);
    }
    const trackIndex = await TrackPlayer.getCurrentTrack();
    const trackObject = await TrackPlayer.getTrack(trackIndex);
    setSurahName(trackObject?.title);
    setReciterName(trackObject?.artist);
  };

  useEffect(() => {
    listeners.current.push(
      TrackPlayer.addEventListener(Event.PlaybackTrackChanged, async event => {
        const trackIndex = await TrackPlayer.getCurrentTrack();
        const trackObject = await TrackPlayer.getTrack(trackIndex);
        setSurahName(trackObject.title);
        setReciterName(trackObject.artist);
      }),
    );
    listeners.current.push(
      TrackPlayer.addEventListener(Event.PlaybackState, event => {
        if (event.state === State.Playing) {
          setPlaying(prev => true);
        } else {
          setPlaying(prev => false);
        }
      }),
    );

    getPlayerState();
    return () => {
      listeners.current.forEach(listener => listener.remove());
      listeners.current = [];
    };
  }, []);
  return (
    <Card CardStyle={styles.container}>
      {surahName && reciterName ? (
        <View style={styles.infoContainer}>
          <Text style={styles.surah}>{`سورة ${surahName}`}</Text>
          <Text style={styles.reciterName}>{reciterName}</Text>
        </View>
      ) : null}
      <Slider
        style={styles.slider}
        value={value}
        minimumValue={0}
        maximumValue={maxValue}
        thumbTintColor="#0a5b55"
        minimumTrackTintColor="#11998e"
        maximumTrackTintColor="grey"
        onSlidingComplete={async value => {
          await TrackPlayer.seekTo(value);
        }}
      />
      <View style={styles.progressWrapper}>
        <Text style={styles.duration}>{TimeCalculator(parseInt(value))}</Text>
        <Text style={styles.duration}>
          {TimeCalculator(parseInt(maxValue))}
        </Text>
      </View>
      <View style={styles.controlsWrapper}>
        <TouchableOpacity
          onPress={async () => {
            await TrackPlayer.skipToPrevious();
          }}
          activeOpacity={0.7}
          style={styles.iconBtn}>
          <Icon
            type={Icons.Entypo}
            name="controller-jump-to-start"
            size={26}
            color="#0a5b55"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={playPauseHandler}
          activeOpacity={0.7}
          style={styles.iconBtn}>
          {playing ? (
            <Icon
              type={Icons.Entypo}
              name="controller-paus"
              size={26}
              color="#0a5b55"
            />
          ) : (
            <Icon
              type={Icons.Entypo}
              name="controller-play"
              size={26}
              color="#0a5b55"
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            await TrackPlayer.skipToNext();
          }}
          activeOpacity={0.7}
          style={styles.iconBtn}>
          <Icon
            type={Icons.Entypo}
            name="controller-next"
            size={26}
            color="#0a5b55"
          />
        </TouchableOpacity>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    alignItems: 'center',
  },
  slider: {
    height: 10,
    width: '90%',
    marginVertical: 5,
  },
  progressWrapper: {
    width: '90%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 5,
  },
  controlsWrapper: {
    width: '90%',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    marginBottom: 5,
  },
  iconBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dce8dc',
  },
  reciterName: {
    fontSize: 14,
    color: '#11998e',
    alignSelf: 'center',
    fontFamily: 'Tajawal-Regular',
    textAlign: 'center',
    lineHeight: 22,
  },
  surah: {
    fontSize: 16,
    color: '#0a5b55',
    alignSelf: 'center',
    fontFamily: 'Tajawal-Bold',
    textAlign: 'center',
  },
  infoContainer: {
    alignItems: 'center',
  },
  duration: {
    fontSize: 16,
    color: '#0a5b55',
    alignSelf: 'center',
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
  },
});

export default Player;
