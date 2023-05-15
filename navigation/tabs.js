import React from 'react';
import {View, Image, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {More} from '../screens';
import {Quran} from '../screens';
import {Salah} from '../screens';
import Home from '../screens/Home';
import Header from '../src/components/Header';
import Library from '../screens/Library';

const Tab = createBottomTabNavigator();

const TabBarCustomButton = ({children, onPress}) => {
  return (
    <View style={styles.curvedBtn}>
      <TouchableOpacity
        style={{
          flex: 1,
        }}
        activeOpacity={0.7}
        onPress={onPress}>
        <LinearGradient
          style={{
            flex: 1,
          }}
          colors={['#ffff', '#dce8dc']}>
          {children}
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};
const Tabs = () => {
  return (
    <Tab.Navigator
      backBehavior="initialRoute"
      initialRouteName="Home"
      screenOptions={{
        headerShown: true,
        tabBarShowLabel: false,
        headerTitle: props => <Header titleColor="#11998e" {...props} />,
        headerStyle: {
          backgroundColor: 'white',
          elevation: 12,
          shadowColor: '#11998e',
        },
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          backgroundColor: 'white',
          borderTopWidth: 0.3,
          borderTopColor: 'grey',
          height: 60,
        },
      }}>
      <Tab.Screen
        name="More"
        component={More}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                borderTopColor: '#11998e',
                borderTopWidth: focused ? 2 : 0,
                flex: 1,
              }}>
              <Entypo
                name="menu"
                size={20}
                color={focused ? '#11998e' : 'black'}
              />
              <Text
                style={{
                  color: focused ? '#11998e' : 'black',
                  fontSize: 13,
                  bottom: 0,
                  fontFamily: 'Tajawal-Bold',
                }}>
                المزيد
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Salah"
        component={Salah}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                borderTopColor: '#11998e',
                borderTopWidth: focused ? 2 : 0,
                flex: 1,
              }}>
              <FontAwesome5
                name="mosque"
                size={20}
                color={focused ? '#11998e' : 'black'}
              />
              <Text
                style={{
                  color: focused ? '#11998e' : 'black',
                  fontSize: 13,
                  bottom: 0,
                  fontFamily: 'Tajawal-Bold',
                }}>
                م. الصلاه
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Library"
        component={Library}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center'}}>
              <Ionicons
                name="library"
                size={24}
                color={focused ? '#11998e' : 'black'}
              />
              <Text
                style={{
                  color: focused ? '#11998e' : 'black',
                  fontSize: 12,
                  bottom: 0,
                  fontFamily: 'Tajawal-Bold',
                }}>
                المكتبه
              </Text>
            </View>
          ),
          tabBarButton: props => <TabBarCustomButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Quran"
        component={Quran}
        options={{
          headerTitle: props => <Header titleColor="#b39262" {...props} />,
          headerStyle: {
            backgroundColor: '#e3d6c3',
            elevation: 15,
            shadowColor: '#b39262',
          },
          headerTintColor: '#b39262',
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                borderTopColor: '#b39262',
                borderTopWidth: focused ? 2 : 0,
                flex: 1,
              }}>
              <FontAwesome5
                name="quran"
                size={20}
                color={focused ? '#b39262' : 'black'}
              />
              <Text
                style={{
                  color: focused ? '#b39262' : 'black',
                  fontSize: 13,
                  bottom: 0,
                  fontFamily: 'Tajawal-Bold',
                }}>
                القرأن
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                borderTopColor: '#11998e',
                borderTopWidth: focused ? 2 : 0,
                flex: 1,
              }}>
              <Entypo
                name="home"
                size={20}
                color={focused ? '#11998e' : 'black'}
              />
              <Text
                style={{
                  color: focused ? '#11998e' : 'black',
                  fontSize: 13,
                  bottom: 0,
                  fontFamily: 'Tajawal-Bold',
                }}>
                الرئيسية
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  curvedBtn: {
    elevation: 6,
    top: -30,
    width: 70,
    height: 70,
    borderRadius: 35,
    overflow: 'hidden',
  },
});

export default Tabs;
