import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Icon, {Icons} from '../components/Icons';
import VerseDetailsItem from '../components/VerseDetailsItem';
const VersesDetailsModal = ({verses, addTafseerToList, closeModal}) => {
  const {width, height} = useWindowDimensions();

  const [reciters, setReciters] = useState([]);
  const [selectedReciterId, setSelectedReciterId] = useState('1');
  const [selectedReciterName, setSelectedReciterName] = useState(null);
  const [tafseerList, setTafseerList] = useState([]);
  const [selectedTafseerId, setSelectedTafseerId] = useState('1');
  const [selectedTafseerName, setSelectedTafseerName] = useState(null);

  const getRecitersList = async () => {
    const reciters = await (
      await axios.get(
        'https://api.quran.com/api/v4/resources/recitations?language=ar',
      )
    ).data.recitations;
    setReciters(reciters);
  };

  const getTafseerList = async () => {
    const response = await axios.get('http://api.quran-tafseer.com/tafseer/');
    setTafseerList(response.data);
  };

  useEffect(() => {
    getTafseerList();
  }, []);

  useEffect(() => {
    getRecitersList();
  }, []);
  return (
    <View style={styles.container}>
      <View style={[styles.wrapper, {height: height * 0.9, width: width}]}>
        <TouchableOpacity onPress={closeModal} style={styles.exitBtn}>
          <Icon
            name="remove"
            type={Icons.FontAwesome}
            size={38}
            color="#b39262"
          />
        </TouchableOpacity>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Text style={styles.text}>تفاصيل الايات</Text>
          <Text
            style={[styles.text, {alignSelf: 'flex-end', marginHorizontal: 4}]}>
            قارئ الايات
          </Text>
          <SelectDropdown
            defaultButtonText={
              selectedReciterName ? selectedReciterName : 'اختر القارئ'
            }
            statusBarTranslucent={true}
            data={reciters}
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
            dropdownStyle={{
              width: width,
              borderRadius: 12,
            }}
            buttonStyle={styles.dropDownButton}
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
          <Text
            style={[styles.text, {alignSelf: 'flex-end', marginHorizontal: 4}]}>
            التفاسير المتاحة
          </Text>
          <SelectDropdown
            buttonTextStyle={styles.text}
            selectedRowStyle={{
              backgroundColor: '#b39262',
            }}
            selectedRowTextStyle={{
              color: 'white',
            }}
            statusBarTranslucent={true}
            rowStyle={styles.dropdownItem}
            rowTextStyle={styles.text}
            renderDropdownIcon={() => {
              return <Icon size={20} type={Icons.AntDesign} name="down" />;
            }}
            dropdownStyle={{
              width: width,
              borderRadius: 12,
            }}
            buttonStyle={styles.dropDownButton}
            defaultButtonText={
              selectedTafseerName ? selectedTafseerName : 'اختر التفسير'
            }
            data={tafseerList}
            onSelect={(selectedItem, index) => {
              addTafseerToList(selectedItem.id, selectedItem.name);
              setSelectedTafseerId(selectedItem.id);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem.name;
            }}
            rowTextForSelection={(item, index) => {
              return item.name;
            }}
          />
          <Text
            style={[styles.text, {alignSelf: 'center', marginVertical: 10}]}>
            الايات المحددة
          </Text>
          {verses.map((verse, index) => {
            return (
              <View
                style={{
                  width: '90%',
                }}
                key={index}>
                <VerseDetailsItem
                  verseItem={verse}
                  selectedReciterId={selectedReciterId}
                  selectedReciterName={selectedReciterName}
                />
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: `rgba(0, 0,0,0.5)`,
  },
  wrapper: {
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#e3d6c3',
  },
  scrollView: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Tajawal-Bold',
    fontSize: 20,
    color: '#b39262',
  },
  dropdownItem: {
    backgroundColor: '#cfc4b4',
  },
  dropDownButton: {
    backgroundColor: '#faf3eb',
    borderWidth: 0.5,
    width: '100%',
    marginVertical: 5,
  },
  exitBtn: {
    alignSelf: 'flex-end',
    marginHorizontal: 10,
    marginVertical: 4,
  },
});

export default VersesDetailsModal;
