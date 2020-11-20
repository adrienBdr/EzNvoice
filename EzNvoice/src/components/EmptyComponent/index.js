import React from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';
import { Card, Text } from 'react-native-elements';
import { SPACING_UNIT } from '../../consts/spacing';
import { COLOR_GREY_200 } from '../../consts/colors';

const EmptyComponent = ({ onPress, title }) => {
  return (
    <Card>
      <TouchableHighlight onPress={onPress} style={styles.container} underlayColor={COLOR_GREY_200}>
        <Text style={styles.text}>{title}</Text>
      </TouchableHighlight>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 250,
    marginHorizontal: SPACING_UNIT * 4,
    alignItems: 'center'
  },
  text: {
    fontSize: 22
  }
});

export default EmptyComponent;
