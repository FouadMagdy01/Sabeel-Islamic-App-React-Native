import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {azkar} from '../src/Azkar';
import AzkarCard from '../src/components/AzkarCard';

const Azkar = ({navigation}) => {
  const buttons = [
    {
      title: 'الصباح',
      identifier: 'Sabah',
    },
    {
      title: 'الاستيقاظ',
      identifier: 'Estiqaz',
    },
    {
      title: 'المساء',
      identifier: 'Masaa',
    },
    {
      title: 'النوم',
      identifier: 'Noom',
    },
  ];
  const [listIdentifier, setListIdentifier] = useState('Masaa');

  const [data, setData] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setData(prev => azkar[listIdentifier]);
    }, 200);
  }, [listIdentifier]);
  return (
    <View style={styles.container}>
      <View style={styles.azkarItemsContainer}>
        {buttons.map((item, index) => {
          return (
            <View key={index}>
              <TouchableOpacity
                onPress={() => {
                  setListIdentifier(item.identifier);
                }}
                activeOpacity={0.7}
                style={[
                  styles.prayerItem,
                  {
                    backgroundColor:
                      listIdentifier === item.identifier ? '#11998e' : null,
                  },
                ]}>
                <Text
                  style={[
                    styles.prayerItemText,
                    {
                      color:
                        listIdentifier === item.identifier
                          ? 'white'
                          : '#0a5b55',
                      marginHorizontal: index === 0 || 5 ? 5 : 0,
                    },
                  ]}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
        }}>
        {data.length === 0
          ? null
          : data.map((item, index) => {
              return (
                <View
                  style={{
                    width: '90%',
                  }}
                  key={item.text}>
                  <AzkarCard
                    CardStyle={{
                      marginTop: index === 0 ? 20 : 0,
                    }}
                    count={item.count}
                    text={item.text}
                  />
                </View>
              );
            })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dce8dc',
  },
  azkarItemsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginTop: 15,
    overflow: 'hidden',
    width: '90%',
    alignSelf: 'center',
  },
  prayerItem: {
    paddingHorizontal: 3,
    paddingVertical: 10,
  },
  prayerItemText: {
    fontSize: 16,
    fontFamily: 'Tajawal-ExtraBold',
  },
});

export default Azkar;
