import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {Alert, TextInput} from 'react-native';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Platform,
  UIManager,
  LayoutAnimation,
} from 'react-native';
import Card from '../components/Card';
import Icon, {Icons} from '../components/Icons';

const BookmarkModal = ({closeModal, navigateToBookMarkPage}) => {
  if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }
  const [pressed, setPressed] = useState(false);
  const {width, height} = useWindowDimensions();
  const [bookmarks, setBookmarks] = useState([]);
  const [bookmarkPage, setBookmarkPage] = useState('');
  const [bookmarkName, setBookmarkName] = useState('');

  const getSavedBookmarks = async () => {
    const bookmarks = await AsyncStorage.getItem('bookmarks');
    if (bookmarks) {
      setBookmarks(JSON.parse(bookmarks));
    }
  };

  const addBookmarkHandler = async () => {
    const pageNumber = parseInt(bookmarkPage);
    if (
      isNaN(pageNumber) ||
      pageNumber > 604 ||
      pageNumber < 1 ||
      bookmarkName.trim().length === 0
    ) {
      Alert.alert('تأكد من ادخال بيانات صالحة');
      return;
    }
    const updatedBookmarks = [
      ...bookmarks,
      {
        title: bookmarkName,
        pageNumber: pageNumber,
        id: (Math.random() + Math.random()).toString(),
      },
    ];
    await AsyncStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
    setBookmarks(updatedBookmarks);
  };

  const removeBookmarkHandler = async id => {
    const updatedBookmarks = bookmarks.filter(bookmark => bookmark.id != id);
    await AsyncStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
    setBookmarks(updatedBookmarks);
  };
  useEffect(() => {
    getSavedBookmarks();
  }, []);
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.wrapper,
          {
            height: height * 0.7,
          },
        ]}>
        <TouchableOpacity onPress={closeModal} style={styles.exitBtn}>
          <Icon
            name="remove"
            type={Icons.FontAwesome}
            size={38}
            color="#b39262"
          />
        </TouchableOpacity>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {bookmarks.map((bookmark, index) => {
            return (
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                }}
                key={bookmark.id}>
                <Card CardStyle={styles.bookmarkCard}>
                  <Pressable
                    onPress={() => {
                      navigateToBookMarkPage(bookmark.pageNumber);
                      closeModal();
                    }}
                    android_ripple={{
                      color: '#b39262',
                    }}
                    style={styles.bookmarkBtn}>
                    <TouchableOpacity
                      onPress={removeBookmarkHandler.bind(this, bookmark.id)}
                      activeOpacity={0.7}>
                      <Icon
                        name="trash"
                        type={Icons.FontAwesome5}
                        size={26}
                        color="#755d38"
                      />
                    </TouchableOpacity>
                    <View style={styles.bookMarkInfo}>
                      <Text style={styles.section}>
                        اسم العلامه:{' '}
                        <Text style={styles.subSection}>{bookmark.title}</Text>
                      </Text>
                      <Text style={styles.section}>
                        رقم الصفحة:{' '}
                        <Text style={styles.subSection}>
                          {bookmark.pageNumber}
                        </Text>
                      </Text>
                    </View>
                  </Pressable>
                </Card>
              </View>
            );
          })}
          {pressed && (
            <View
              style={{
                width: '90%',
              }}>
              <TextInput
                value={bookmarkName}
                onChangeText={setBookmarkName}
                placeholderTextColor="#ada290"
                textAlign="right"
                placeholder="اسم العلامه"
                style={styles.input}
              />
              <TextInput
                value={bookmarkPage}
                onChangeText={setBookmarkPage}
                keyboardType="numeric"
                placeholderTextColor="#ada290"
                textAlign="right"
                placeholder="رقم الصفحه"
                style={styles.input}
              />
            </View>
          )}
          <TouchableOpacity
            onPress={() => {
              if (!pressed) {
                LayoutAnimation.easeInEaseOut();
                setPressed(true);
              } else {
                addBookmarkHandler();
              }
            }}
            activeOpacity={0.7}
            style={styles.addBookmarkBtn}>
            <Icon name="plus" type={Icons.Entypo} size={38} color="white" />
            <Text style={styles.addBookmarkBtnTxt}>اضافة علامة جديدة</Text>
          </TouchableOpacity>
        </ScrollView>
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
    width: '80%',
    backgroundColor: '#fffdfa',
    borderRadius: 12,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  exitBtn: {
    alignSelf: 'flex-end',
    marginHorizontal: 10,
    marginBottom: 8,
  },
  bookmarkCard: {
    width: '90%',
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#c9bead',
  },
  bookmarkBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 6,
  },
  bookMarkInfo: {
    flex: 1,
  },
  section: {
    fontFamily: 'Tajawal-Bold',
    color: '#6b5533',
    fontSize: 18,
    lineHeight: 25,
  },
  subSection: {
    fontFamily: 'Tajawal-Medium',
    color: '#6b5533',
    fontSize: 16,
    lineHeight: 25,
  },
  addBookmarkBtn: {
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    borderRadius: 8,
    backgroundColor: '#b39262',
    marginBottom: 12,
  },
  addBookmarkBtnTxt: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Tajawal-Bold',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#b39262',
    width: '100%',
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 6,
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    color: '#4a3617',
  },
});

export default BookmarkModal;
