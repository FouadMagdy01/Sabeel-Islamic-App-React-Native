import axios from 'axios';
import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  useWindowDimensions,
} from 'react-native';
import TrackPlayer, {
  Event,
  State,
  useProgress,
} from 'react-native-track-player';
import BookFatwaCard from '../src/components/BookFatwaCard';
import ErrorOverlay from '../src/UI/ErrorOverlay';
import LoadingOverlay from '../src/UI/LoadingOverlay';
import Pagination from '../src/UI/Pagination';
import Player from '../src/UI/Player';

const Fatwa = ({navigation}) => {
  const {width, height} = useWindowDimensions();
  const [currentPage, setCurrentPage] = useState(1);
  const [fatwas, setFatwas] = useState([]);
  const [maxNumber, setMaxNumber] = useState(25);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const [specialCase, setSpecialCase] = useState(false);
  const [playing, setPlaying] = useState(false);
  const listeners = useRef([]);

  function removeHtmlTagsAndNonArabicChars(text) {
    var cleanText = text.replace(/<[^>]*>/g, '');
    return cleanText;
  }

  const handleFatwaSetup = async fatwaObject => {
    if (fatwaObject.fileType === 'PDF') {
      navigation.navigate('PdfReader', {
        pdfUrl: fatwaObject.url,
      });
    } else {
      await TrackPlayer.reset();
      await TrackPlayer.add([
        {
          url: fatwaObject.url,
          title: fatwaObject.fatwaTitle,
          artist: fatwaObject.authors[0]?.title,
        },
      ]);
      await TrackPlayer.play();
    }
  };

  const getFatwas = async () => {
    setSpecialCase(false);
    setFatwas([]);
    setLoading(true);
    try {
      const fatwas = [];
      const response = await axios.get(
        `https://api3.islamhouse.com/v3/paV29H2gm56kvLPy/main/fatwa/ar/ar/${currentPage}/25/json`,
      );
      response.data.data.forEach(fatwa => {
        fatwa.attachments.forEach(attachment => {
          if (
            attachment.extension_type === 'PDF' ||
            attachment.extension_type === 'MP3'
          ) {
            fatwas.push({
              fatwaTitle: fatwa.title,
              fatwaDesc: removeHtmlTagsAndNonArabicChars(fatwa.description),
              authors: fatwa.prepared_by,
              url: attachment.url,
              id: (fatwa.id + fatwa.add_date) * Math.random(),
              size: attachment.size,
              fileType: attachment.extension_type,
            });
          }
        });
      });
      if (fatwas.length === 0) {
        setSpecialCase(true);
      }
      setFatwas(fatwas);
      setMaxNumber(response.data.links.pages_number);
    } catch (err) {
      setErr(true);
    }
    setLoading(false);
  };

  const progress = useProgress();
  useEffect(() => {
    getFatwas();
  }, [currentPage]);

  useEffect(() => {
    console.log('mount');
    listeners.current.push(
      TrackPlayer.addEventListener(Event.PlaybackState, event => {
        if (event.state === State.Playing) {
          setPlaying(prev => true);
        } else {
          setPlaying(prev => false);
        }
      }),
    );
    return async () => {
      console.log('return');
      listeners.current = [];
      await TrackPlayer.reset();
    };
  }, []);
  return (
    <View style={styles.container}>
      {loading && <LoadingOverlay message="جاري تحميل الكتب والمقالات" />}
      {err && (
        <ErrorOverlay message="حدث خطأ اثناء تحميل الكتب, تأكد من وجود اتصال بالانترنت وأعد المحاولة لاحقا" />
      )}
      {(fatwas.length != 0 || specialCase) && (
        <FlatList
          contentContainerStyle={{
            alignItems: 'center',
            flexGrow: 1,
          }}
          data={fatwas}
          renderItem={fatwa => {
            return (
              <View>
                <BookFatwaCard
                  fatwa={true}
                  onPress={() => {
                    handleFatwaSetup(fatwa.item);
                  }}
                  cardStyle={{
                    marginTop: 20,
                    marginBottom: fatwa.index + 1 === fatwas.length ? 20 : 0,
                  }}
                  fileType={fatwa.item.fileType}
                  name={fatwa.item.fatwaTitle}
                  desc={fatwa.item.fatwaDesc}
                  authors={fatwa.item.authors}
                  size={fatwa.item.size}
                />
                {fatwa.index + 1 === fatwas.length && (
                  <Pagination
                    paginationStyle={{
                      marginBottom: playing ? 180 : 20,
                    }}
                    currentPage={currentPage}
                    onPageChange={newPage => {
                      console.log(newPage);

                      setCurrentPage(newPage);
                    }}
                    maxValue={maxNumber}
                  />
                )}
              </View>
            );
          }}
          keyExtractor={item => item.id}
        />
      )}
      {playing && (
        <Player value={progress.position} maxValue={progress.duration} />
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

export default Fatwa;
