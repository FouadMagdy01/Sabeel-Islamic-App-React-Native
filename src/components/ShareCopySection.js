import Clipboard from '@react-native-clipboard/clipboard';
import React, {Component} from 'react';
import {Text, StyleSheet, View, Share, ToastAndroid} from 'react-native';
import {Icons} from './Icons';
import IconTitleButton from './IconTitleButton';

const ShareCopySection = ({text, shareTitle, buttonsStyle, iconTitleProps}) => {
  const handleShare = async text => {
    await Share.share(
      {
        message: text,
      },
      {dialogTitle: shareTitle},
    );
  };

  const handleCopy = text => {
    Clipboard.setString(text);
    ToastAndroid.show('تم نسخ الدعاء الي الحافظة', ToastAndroid.LONG);
  };

  return (
    <View style={styles.buttonsWrapper}>
      <IconTitleButton
        rippleColor="#50948f"
        {...iconTitleProps}
        buttonStyle={buttonsStyle}
        btnContainerStyle={styles.btnContainerStyle}
        color="#dce8dc"
        size={26}
        type={Icons.Entypo}
        name="share"
        buttonTitle="مشاركة"
        onPress={handleShare.bind(this, text)}
      />
      <IconTitleButton
        rippleColor="#50948f"
        {...iconTitleProps}
        buttonStyle={buttonsStyle}
        btnContainerStyle={styles.btnContainerStyle}
        color="#dce8dc"
        size={26}
        type={Icons.MaterialCommunityIcons}
        name="content-copy"
        buttonTitle="نسخ الي الحافظة"
        onPress={handleCopy.bind(this, text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsWrapper: {
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  btnContainerStyle: {
    maxWidth: '75%',
    marginBottom: 10,
  },
});

export default ShareCopySection;
