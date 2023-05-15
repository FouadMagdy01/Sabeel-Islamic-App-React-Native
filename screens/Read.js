import React, {useState, useEffect, useLayoutEffect} from 'react';
import Pdf from 'react-native-pdf';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingOverlay from '../src/UI/LoadingOverlay';
import {useSelector, useDispatch} from 'react-redux';
import {saveGoals} from '../redux/todos';
import BookmarkModal from '../src/UI/BookmarksModal';
import Icon, {Icons} from '../src/components/Icons';
import TitleHeader from '../src/components/TitleHeader';
import SurahListModal from '../src/UI/SurahListModal';

const Read = ({navigation}) => {
  const [page, setPage] = useState(1);
  const [scale, setScale] = useState(1);
  const [number, setNumber] = useState('');
  const [isFirst, setIsFirst] = useState(0);
  const [bookmarksModal, setBookmarksModal] = useState(false);
  const [surahListModal, setSurahListModal] = useState(false);

  const dispatch = useDispatch();

  const goals = useSelector(state => state.todos);

  const getLastRead = async () => {
    const lastRead = await AsyncStorage.getItem('lastPage');
    if (lastRead) {
      setPage(parseInt(lastRead));
    }
  };

  const progressHandler = async () => {
    if (isFirst < 2) {
      setIsFirst(isFirst + 1);
      return;
    }
    const goalsWithProgress = goals.map((goal, index) => {
      if (goal.type === 'quran') {
        return {
          ...goal,
          progress: goal.progress + 1,
        };
      }
      return goal;
    });
    dispatch(
      saveGoals({
        goals: goalsWithProgress,
      }),
    );
    await AsyncStorage.setItem('goals', JSON.stringify(goalsWithProgress));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: props => (
        <TitleHeader title="Sabeel" titleColor="#b39262" {...props} />
      ),
      headerStyle: {
        backgroundColor: '#e3d6c3',
        elevation: 12,
        shadowColor: '#b39262',
      },
      headerTintColor: '#b39262',
      headerShown: true,
      headerRight: props => (
        <View
          style={{
            flexDirection: 'row',
          }}>
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
          <TouchableOpacity
            onPress={() => {
              setSurahListModal(true);
            }}
            activeOpacity={0.7}
            style={{
              marginRight: 12,
            }}>
            <Icon
              name="list"
              type={Icons.FontAwesome}
              color="#b39262"
              size={36}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    getLastRead();
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: '#FFF8EE'}}>
      <Modal
        animationType="fade"
        transparent
        statusBarTranslucent
        visible={bookmarksModal}
        onRequestClose={() => {
          setBookmarksModal(false);
        }}>
        <BookmarkModal
          navigateToBookMarkPage={page => {
            setPage(page);
          }}
          closeModal={() => {
            setBookmarksModal(false);
          }}
        />
      </Modal>
      <Modal
        animationType="fade"
        transparent
        statusBarTranslucent
        visible={surahListModal}
        onRequestClose={() => {
          setSurahListModal(false);
        }}>
        <SurahListModal
          navigateToPage={page => {
            setPage(page - 1);
          }}
          closeModal={() => {
            setSurahListModal(false);
          }}
        />
      </Modal>
      <Pdf
        renderActivityIndicator={() => {
          return (
            <LoadingOverlay message="الرجاء الانتظار حتي يتم تحميل المصحف" />
          );
        }}
        onPageChanged={progressHandler}
        page={page + 1}
        scale={scale}
        enablePaging={true}
        source={{
          uri: 'https://firebasestorage.googleapis.com/v0/b/spe-events.appspot.com/o/Noor-Book.com%20%20%D9%85%D8%B5%D8%AD%D9%81%20%D9%85%D8%AC%D9%85%D8%B9%20%D8%A7%D9%84%D9%85%D9%84%D9%83%20%D9%81%D9%87%D8%AF%20%D9%86%D8%B3%D8%AE%D8%A9%20%D8%AE%D8%A7%D8%B5%D8%A9%20%D8%B5%D8%BA%D9%8A%D8%B1%D8%A9%20%D8%A7%D9%84%D8%AD%D8%AC%D9%85.pdf?alt=media&token=e24a205e-4a45-4ffe-b411-6384341c2e15',
          cache: true,
        }}
        style={{width: '100%', height: '90%', backgroundColor: '#FFF8EE'}}
      />
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
          justifyContent: 'space-between',
          width: '90%',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            if (page === 1) {
              setPage(1);
            } else {
              setPage(page - 1);
            }
          }}>
          <Icon
            type={Icons.Feather}
            color="#b39262"
            name="chevron-left"
            size={30}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (scale === 1) {
              setScale(1);
            } else {
              setScale(scale - 0.2);
            }
          }}>
          <Icon
            type={Icons.Feather}
            color="#b39262"
            name="zoom-out"
            size={30}
          />
        </TouchableOpacity>
        <TextInput
          textAlign="right"
          value={number}
          onChangeText={value => {
            setNumber(value);
          }}
          onEndEditing={() => {
            const pageNum = parseInt(number);
            if (isNaN(pageNum)) {
              return Alert.alert('ادخال غير صالح');
            }
            setPage(parseInt(number));
          }}
          keyboardType="number-pad"
          placeholder="رقم الصفحة"
          style={{
            width: '25%',
            height: '90%',
            backgroundColor: 'white',
            borderRadius: 15,
            flexDirection: 'row-reverse',
            paddingHorizontal: 4,
            borderWidth: 1,
          }}
        />
        <TouchableOpacity
          onPress={() => {
            if (scale === 3) {
              setScale(3);
            } else {
              setScale(scale + 0.1);
            }
          }}>
          <Icon type={Icons.Feather} color="#b39262" name="zoom-in" size={30} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setPage(page + 1);
          }}>
          <Icon
            type={Icons.Feather}
            color="#b39262"
            name="chevron-right"
            size={30}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({});
export default Read;
