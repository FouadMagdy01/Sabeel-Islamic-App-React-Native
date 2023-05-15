import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
  Pressable,
  Button,
  Linking,
  Alert,
} from 'react-native';
import PushNotification from 'react-native-push-notification';
import CollapsedHeader from '../src/components/CollapsedHeader';
import Icon, {Icons} from '../src/components/Icons';
const More = ({navigation}) => {
  const openLink = async (link, secondLink) => {
    try {
      await Linking.openURL(link);
    } catch (err) {
      try {
        if (secondLink) {
          await Linking.openURL(secondLink);
        }
      } catch (err) {
        Alert.alert('حدث خطأ ما ');
      }
    }
  };
  const [notificationToggle, setNotificationToggle] = useState(false);

  const references = [
    {
      url: 'mp3quran.com',
      reference: 'Quran reciters',
    },
    {
      reference: 'Quran Text',
      url: 'quran.api-docs.io',
    },
    {
      reference: 'Quran Ayah reciters',
      url: 'quran.api-docs.io',
    },
    {
      reference: 'Tafseer',
      url: 'api.quran-tafseer.com',
    },
    {
      reference: 'hadiths and sunnah',
      url: 'sunnah.api-docs.io',
    },
    {
      reference: 'Prayer Times',
      url: ' aladhan.com',
    },
  ];

  const handleToggleNotification = async () => {
    if (notificationToggle) {
      await AsyncStorage.removeItem('prayer_notification');
    } else {
      await AsyncStorage.setItem('prayer_notification', 'allow');
    }
    setNotificationToggle(!notificationToggle);
  };

  const getNotificationPermissionStatus = async () => {
    const notificationAllowed = await AsyncStorage.getItem(
      'prayer_notification',
    );
    if (notificationAllowed) {
      setNotificationToggle(!!notificationAllowed);
    }
  };

  const activeOpacity = 0.7;
  useEffect(() => {
    getNotificationPermissionStatus();
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}>
        <View style={styles.notification}>
          <Text style={styles.notificationText}>اشعارات الاذان</Text>
          <Switch
            value={notificationToggle}
            onValueChange={handleToggleNotification}
            style={styles.switch}
          />
        </View>
        <CollapsedHeader
          buttonStyle={styles.collapsedHeaderBtn}
          headerTitle="عن التطبيق">
          <Text style={styles.text}>
            حرصآ منا علي تسهيل وتوفير أدوات العبادة في الدين الاسلامي, ونظرآ
            لندرة التطبيقات التي تجمع العديد من المميزات التي يحتاجها
            المسلم/المسلمه في حياته وإستخدامه اليومي وفي نفس الوقت تخلو من أي
            إعلانات او مشتتات. قمنا بتطوير تطبيق سبيل, حيث يجمع لك معظم
            احتياجاتك اليومية والحياتيه من الدين الاسلامي بشكل منظم ومنسق وذو
            أداء سريع وسلس تطبيق سبيل هو تطبيق إسلامي مجاني بالكامل وخالي من أي
            إعلانات. مع توافر مميزات عديده تجعل وصولك أسهل إلي مصادر ديننا
            الإسلامي{'\n'}
          </Text>
        </CollapsedHeader>
        <CollapsedHeader
          buttonStyle={styles.collapsedHeaderBtn}
          headerTitle="مميزات التطبيق">
          <Text style={styles.text}>
            1-معرفة مواقيت الصلاه بشكل دقيق وطبقا لموقعك الحالي مع توافر إمكانية
            الوصول إليها اثناء عدم وجود اتصال بالانترنت
            {'\n'}
            2-الاذكار اليوميه بشكل منظم وسهل{'\n'}
            3-أدعية سيدنا محمد عليه الصلاة والسلام مع إمكانية مشاركتها{'\n'}
            5-تحديات يومية لقراءة القرآن وذكر الله سبحانه وتعالى{'\n'}
            6-أكثر من 250 تلاوه للقرآن الكريم مع توفر إمكانية التحميل{'\n'}
            7-يمكنك أيضا الاستماع للسور اثناء عدم الاتصال بالانترنت من خلال
            التطبيق{'\n'}
            8-قراءة القرآن الكريم مع إمكانية تكبير وتصغير الخط{'\n'}
            9-الاضطلاع علي تفسير آيات القرآن الكريم والاستمتاع لكل آيه علي حدي
            تسهيلا منا لعملية فهم وتدبر القرآن الكريم{'\n'}
            10-توفر 12 تفسير مختلف للقرآن الكريم بلغات مختلفة مع امكانية مشاركة
            كل تفسير{'\n'}
            11-توفر 12 قارئ لآيات القرآن الكريم{'\n'}
            12-توفر اكثر من مصدر للسنه النبوية والحديث الشريف{'\n'}
          </Text>
        </CollapsedHeader>
        <CollapsedHeader
          buttonStyle={styles.collapsedHeaderBtn}
          headerTitle="المشاركون">
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 5,
            }}>
            <Text>Graphic Designer: Esraa ALI</Text>
          </View>
        </CollapsedHeader>
        <CollapsedHeader
          buttonStyle={styles.collapsedHeaderBtn}
          headerTitle="المصادر">
          <Text style={styles.text}>
            {references.map((reference, index) => {
              return (
                <Text key={index}>
                  {reference.reference}
                  {'  '}
                  <Text
                    style={[
                      styles.text,
                      {
                        fontFamily: 'Roboto-Regular',
                      },
                    ]}>
                    {reference.url}
                    {'\n'}
                  </Text>
                </Text>
              );
            })}
          </Text>
        </CollapsedHeader>
        <Pressable
          onPress={openLink.bind(
            this,
            `mailto:${'fouad.magdy772@gmail.com'}?subject=${'Sabeel App inquiery'}&body=${'يوجد مشكلة ما في التطبيق الا وهي......'}`,
          )}
          android_ripple={{color: '#FFFFE0'}}
          style={styles.notification}>
          <Text style={styles.notificationText}>الابلاغ عن مشكلة</Text>
        </Pressable>
        <CollapsedHeader
          buttonStyle={[styles.collapsedHeaderBtn]}
          headerTitle="تواصل معنا">
          <View style={styles.contactUs}>
            <TouchableOpacity
              onPress={openLink.bind(
                this,
                'https://www.facebook.com/fouadmagdy1911',
              )}
              activeOpacity={activeOpacity}>
              <Icon
                color="#2e8077"
                type={Icons.FontAwesome}
                name="facebook-square"
                size={40}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={openLink.bind(
                this,
                `whatsapp://send?phone=${'*201096840406'}`,
                `https://wa.me/${'+201096840406'}`,
              )}
              activeOpacity={activeOpacity}>
              <Icon
                color="#2e8077"
                type={Icons.FontAwesome}
                name="whatsapp"
                size={40}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={openLink.bind(
                this,
                `tg://resolve?domain=${'sabeelApp'}`,
                `https://t.me/${'sabeelApp'}`,
              )}
              activeOpacity={activeOpacity}>
              <Icon
                color="#2e8077"
                type={Icons.FontAwesome}
                name="telegram"
                size={40}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={openLink.bind(
                this,
                `mailto:${'fouad.magdy772@gmail.com'}?subject=${'Sabeel App inquiery'}&body=${''}`,
              )}
              activeOpacity={activeOpacity}>
              <Icon
                color="#2e8077"
                type={Icons.AntDesign}
                name="mail"
                size={40}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={openLink.bind(
                this,
                `linkedin://profile/fouad-magdy-570458224`,
                'https://www.linkedin.com/in/fouad-magdy-570458224',
              )}
              activeOpacity={activeOpacity}>
              <Icon
                color="#2e8077"
                type={Icons.AntDesign}
                name="linkedin-square"
                size={40}
              />
            </TouchableOpacity>
          </View>
        </CollapsedHeader>
        <View style={styles.footerContainer}>
          <View style={styles.footer}>
            <View style={styles.appInfo}>
              <Image
                source={require('../assets/images/islam.png')}
                style={styles.appIcon}
              />
              <View>
                <Text style={styles.text}>Sabeel App</Text>
                <Text style={styles.subText}>Your free islamic platform</Text>
              </View>
            </View>
            <Text style={[styles.subText]}>
              <Icon
                color="#2e8077"
                type={Icons.AntDesign}
                name="copyright"
                size={14}
              />{' '}
              All Copyrights reserved
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebf7f6',
  },
  collapsedHeaderBtn: {
    backgroundColor: 'white',
    borderColor: '#2e8077',
    borderWidth: 0.5,
  },
  text: {
    fontFamily: 'Roboto-Bold',
    color: '#2e8077',
    fontSize: 18,
    marginHorizontal: 5,
  },
  subText: {
    fontFamily: 'Roboto-Regular',
    color: '#2e8077',
    fontSize: 14,
    marginHorizontal: 5,
  },
  contactUs: {
    width: '75%',
    flexDirection: 'row',
    marginTop: 5,
    justifyContent: 'space-around',
    alignSelf: 'center',
  },
  notification: {
    backgroundColor: 'white',
    borderColor: '#2e8077',
    borderWidth: 0.5,
    paddingHorizontal: 6,
    paddingVertical: 10,
    justifyContent: 'center',
  },
  notificationText: {
    fontFamily: 'Roboto-Bold',
    color: '#2e8077',
    fontSize: 18,
  },
  switch: {
    position: 'absolute',
    marginLeft: 5,
  },
  appInfo: {
    flexDirection: 'row',
    marginTop: 25,
    alignItems: 'center',
    marginBottom: 8,
  },
  appIcon: {
    width: 55,
    height: 55,
  },
  footerContainer: {
    justifyContent: 'flex-end',
    marginBottom: 95,
    flexGrow: 1,
  },
  footer: {
    alignItems: 'center',
  },
});

export default More;
