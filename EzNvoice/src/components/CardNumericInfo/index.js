import React from 'react';
import { Card, Text } from 'react-native-elements';
import { StyleSheet, View } from 'react-native';
import { COLOR_GREY_700, COLOR_GREY_900, COLOR_PRIMARY_LIGHT } from '../../consts/colors';

const CardNumericInfo = ({ title, data, size = 'small' }) => {
  return (
    <Card>
      <Card.Title><Text style={styles.titleText}>{title}</Text></Card.Title>
      <View style={size === 'small' ? styles.roundViewSmall : styles.roundViewBig}>
        {size === 'small'
          ? <Text h1 style={styles.dataText}>{data}</Text>
          : <Text h3 style={styles.dataText}>{data}</Text>}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontSize: 24, fontWeight: 'bold', color: COLOR_GREY_900
  },
  roundViewSmall: {
    borderWidth: 6,
    borderRadius: 50,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignSelf: 'center',
    borderColor: COLOR_PRIMARY_LIGHT,
    borderBottomWidth: 2
  },
  roundViewBig: {
    borderWidth: 6,
    borderRadius: 75,
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignSelf: 'center',
    borderColor: COLOR_PRIMARY_LIGHT,
    borderBottomWidth: 2
  },
  dataText: {
    textAlign: 'center',
    color: COLOR_GREY_700
  }
});

export default CardNumericInfo;
