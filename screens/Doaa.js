import React, {useEffect, useLayoutEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {doaa_list} from '../src/doaa_data';
import Card from '../src/components/Card';

import ShareCopySection from '../src/components/ShareCopySection';

const Doaa = ({navigation}) => {
  const [doaaList, setDoaaList] = useState([]);
  useEffect(() => {
    setTimeout(() => {
      setDoaaList(doaa_list);
    }, 50);
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
        }}
        style={{
          width: '100%',
        }}>
        <View style={styles.scrollWrapper}>
          {doaaList.map((doaa, index) => {
            return (
              <View key={index}>
                <Card CardStyle={styles.doaaCard}>
                  <Text style={styles.text}>{doaa.Text}</Text>
                  <ShareCopySection
                    text={doaa.Text}
                    shareTitle="شارك هذا الدعاء"
                  />
                </Card>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dce8dc',
  },
  doaaCard: {
    backgroundColor: '#ffffffff',
    marginBottom: 25,
    paddingVertical: 20,
    width: '100%',
    paddingHorizontal: 6,
    borderRadius: 15,
  },
  scrollWrapper: {
    marginTop: 25,
    width: '90%',
  },
  text: {
    fontFamily: 'Tajawal-ExtraBold',
    fontSize: 20,
    lineHeight: 40,
    color: '#0a5b55',
    textAlign: 'center',
    marginBottom: 10,
  },
  buttonsWrapper: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
  },
  btnContainerStyle: {
    maxWidth: '50%',
  },
});
export default Doaa;
