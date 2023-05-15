import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  LayoutAnimation,
  Platform,
  UIManager,
  Pressable,
  TouchableOpacity,
  Dimensions,
  Text,
  TextInput,
  Switch,
  Alert,
} from 'react-native';
import Icon, {Icons} from '../components/Icons';
import TrackPlayer, {Event, State} from 'react-native-track-player';
import axios from 'axios';
import SelectDropdown from 'react-native-select-dropdown';
import {SurahList} from '../Surah';
const {width} = Dimensions.get('window');
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
const BottomSheet = ({
  onAyahChange,
  playPageVerses,
  forward,
  backward,
  navigateToPage,
  fontSize,
  increaseFontSize,
  decreaseFontSize,
  selecting,
  switchMode,
}) => {
  const [playing, setPlaying] = useState(false);
  const [reciters, setReciters] = useState([]);
  const [selectedReciterId, setSelectedReciterId] = useState('1');
  const [selectedReciterName, setSelectedReciterName] = useState(null);
  const [page, setPage] = useState('');
  const listeners = useRef([]);

  const playPauseHandler = async () => {
    if (playing) {
      return await TrackPlayer.pause();
    }
    playPageVerses(selectedReciterId, selectedReciterName);
  };

  const getPlayerState = async () => {
    const state = await TrackPlayer.getState();
    if (state === State.Playing) {
      setPlaying(true);
    }
  };

  const getRecitersList = async () => {
    const reciters = await (
      await axios.get(
        'https://api.quran.com/api/v4/resources/recitations?language=ar',
      )
    ).data.recitations;
    setReciters(reciters);
  };

  useEffect(() => {
    listeners.current.push(
      TrackPlayer.addEventListener(Event.PlaybackTrackChanged, async event => {
        const trackIndex = await TrackPlayer.getCurrentTrack();
        const trackObject = await TrackPlayer.getTrack(trackIndex);
        onAyahChange(trackObject);
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
    getRecitersList();
    getPlayerState();
    return async () => {
      listeners.current.forEach(listener => listener.remove());
      listeners.current = [];
      await TrackPlayer.reset();
    };
  }, []);
  const [pressed, setPressed] = useState(false);
  return (
    <View style={styles.bottomSheet}>
      <View style={styles.buttonWrapper}>
        <Pressable
          style={styles.button}
          android_ripple={{color: '#b39262'}}
          onPress={() => {
            LayoutAnimation.easeInEaseOut();
            setPressed(!pressed);
          }}>
          <Icon
            size={28}
            type={Icons.AntDesign}
            name={pressed ? 'down' : 'up'}
          />
        </Pressable>
      </View>
      {pressed ? (
        <View
          style={{
            width: width,
          }}>
          <View style={styles.controlsWrapper}>
            <View style={styles.section}>
              <TextInput
                keyboardType="number-pad"
                value={page}
                onChangeText={enteredText => setPage(enteredText)}
                placeholder="رقم الصفحة"
                placeholderTextColor="#b39262"
                style={[styles.pageInput]}
              />
              <View style={styles.pageBtnWrapper}>
                <Pressable
                  style={styles.pageNavBtn}
                  android_ripple={{color: '#F4A460'}}
                  onPress={() => {
                    const pageNum = parseInt(page);
                    if (isNaN(pageNum) || pageNum > 604 || pageNum < 1) {
                      Alert.alert('ادخال غير صالح');
                      return;
                    }

                    navigateToPage(pageNum);
                  }}>
                  <Text style={[styles.text, {color: 'white'}]}>الانتقال</Text>
                </Pressable>
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.text}>حجم الخط</Text>
              <View style={styles.fontControlWrapper}>
                <TouchableOpacity onPress={increaseFontSize}>
                  <Icon
                    type={Icons.AntDesign}
                    name="plus"
                    size={30}
                    color="#b39262"
                  />
                </TouchableOpacity>
                <Text style={[styles.text, {fontFamily: 'Roboto-Bold'}]}>
                  {fontSize}
                </Text>
                <TouchableOpacity onPress={decreaseFontSize}>
                  <Icon
                    type={Icons.Entypo}
                    name="minus"
                    size={30}
                    color="#b39262"
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.fontControlWrapper}>
                <Switch
                  trackColor={{false: '#767577', true: '#F4A460'}}
                  thumbColor={selecting ? '#b39262' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={switchMode}
                  value={selecting}
                />
                <Text style={[styles.text, {color: '#a66821'}]}>
                  {selecting ? 'وضع التحديد' : 'وضع القراءة'}
                </Text>
              </View>
            </View>
          </View>
          <SelectDropdown
            buttonTextStyle={styles.text}
            selectedRowStyle={{
              backgroundColor: '#b39262',
            }}
            selectedRowTextStyle={{
              color: 'white',
            }}
            rowStyle={styles.dropdownItem}
            rowTextStyle={styles.text}
            renderDropdownIcon={() => {
              return <Icon size={20} type={Icons.AntDesign} name="down" />;
            }}
            statusBarTranslucent={true}
            dropdownStyle={{
              width: width,
              borderRadius: 12,
            }}
            buttonStyle={styles.dropDownButton}
            defaultButtonText={
              selectedReciterName ? selectedReciterName : 'اختر القارئ'
            }
            data={reciters}
            onSelect={(selectedItem, index) => {
              setSelectedReciterId(selectedItem.id);
              setSelectedReciterName(selectedItem.translated_name.name);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem.translated_name.name;
            }}
            rowTextForSelection={(item, index) => {
              return item.style
                ? item.style + ' ' + item.translated_name.name
                : item.translated_name.name;
            }}
          />
          <SelectDropdown
            buttonTextStyle={styles.text}
            selectedRowStyle={{
              backgroundColor: '#b39262',
            }}
            selectedRowTextStyle={{
              color: 'white',
            }}
            statusBarTranslucent={true}
            searchInputTxtColor="#b39262"
            search={true}
            renderSearchInputRightIcon={() => {
              return (
                <Icon
                  type={Icons.Feather}
                  name="search"
                  size={26}
                  color="#b39262"
                />
              );
            }}
            rowStyle={styles.dropdownItem}
            rowTextStyle={styles.text}
            searchInputTxtStyle={styles.input}
            searchPlaceHolder="ادخل اسم السورة"
            searchPlaceHolderColor="#b39262"
            searchInputStyle={{
              width: width,
              backgroundColor: '#e0d5c5',
            }}
            renderDropdownIcon={() => {
              return <Icon size={20} type={Icons.AntDesign} name="down" />;
            }}
            dropdownStyle={{
              width: width,
              borderRadius: 12,
            }}
            buttonStyle={styles.dropDownButton}
            defaultButtonText="اختر السورة"
            data={SurahList}
            onSelect={(selectedItem, index) => {
              const surahStartPage = selectedItem.pages[0];
              navigateToPage(surahStartPage);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem.name_arabic;
            }}
            rowTextForSelection={(item, index) => {
              return item.name_arabic;
            }}
          />
          <View style={styles.pageControlsWrapper}>
            <TouchableOpacity onPress={forward}>
              <Text style={styles.text}>الصفحة التالية</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={playPauseHandler} activeOpacity={0.7}>
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
            <TouchableOpacity onPress={backward}>
              <Text style={styles.text}>الصفحة السابقة</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    bottom: 0,
    width: '100%',
    backgroundColor: '#e3d6c3',
    alignItems: 'center',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    overflow: 'hidden',
  },
  buttonWrapper: {
    backgroundColor: '#e3d6c3',

    width: '100%',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageControlsWrapper: {
    width: '100%',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropDownButton: {
    backgroundColor: '#faf3eb',
    borderWidth: 0.5,
    width: '100%',
    marginVertical: 5,
  },
  controlsWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  section: {
    width: '45%',
    padding: 5,
    borderWidth: 1,
    borderColor: '#ab803f',
    borderRadius: 10,
    marginTop: 6,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  input: {
    textAlign: 'right',
    fontFamily: 'Tajawal-Bold',
    fontSize: 18,
    color: '#b39262',
  },
  text: {
    fontFamily: 'Tajawal-Bold',
    fontSize: 16,
    color: '#ab803f',
  },
  dropdownItem: {
    backgroundColor: '#cfc4b4',
  },
  pageInput: {
    width: '95%',
    backgroundColor: '#faf3eb',
    borderWidth: 1,
    borderColor: '#ab803f',
    height: 40,
    borderRadius: 12,
    textAlign: 'right',
    fontFamily: 'Tajawal-Bold',
    fontSize: 14,
    color: '#b39262',
  },
  pageNavBtn: {
    backgroundColor: '#b39262',
    width: '50%',
    padding: 5,
  },
  pageBtnWrapper: {
    overflow: 'hidden',
    borderRadius: 10,
    marginTop: 5,
  },
  fontControlWrapper: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 5,
  },
});

export default BottomSheet;
