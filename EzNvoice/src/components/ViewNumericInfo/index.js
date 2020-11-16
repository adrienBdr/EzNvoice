import React from 'react';
import { Text } from 'react-native-elements';
import { StyleSheet, View } from 'react-native';
import { COLOR_GREY_700, COLOR_PRIMARY_LIGHT } from '../../consts/colors';

const ViewNumericInfo = ({ containerStyle, title, data }) => {
  return (
    <View style={containerStyle}>
      {
        title ? <Text style={styles.normalTitleText}>{title}</Text> : <></>
      }
      <View style={styles.normalRoundedView}>
        <Text
          style={styles.normalDataText}
        >
          {data}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  normalTitleText: {
    fontSize: 20, fontWeight: 'bold'
  },
  normalRoundedView: {
    borderWidth: 4,
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignSelf: 'center',
    borderColor: COLOR_PRIMARY_LIGHT,
    borderBottomWidth: 1
  },
  normalDataText: {
    textAlign: 'center',
    color: COLOR_GREY_700,
    fontSize: 18
  },
});

export default ViewNumericInfo;
