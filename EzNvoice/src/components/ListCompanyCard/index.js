import React from 'react';
import {
  Image, StyleSheet, TouchableOpacity, View
} from 'react-native';
import { Card, Text } from 'react-native-elements';
import { SPACING_UNIT } from '../../consts/spacing';

const ListCompanyCard = ({ onPress, company }) => {
  return (
    <TouchableOpacity onPress={() => onPress()}>
      <Card>
        <View style={styles.container}>
          <View style={styles.imageNameContainer}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: company.image }} style={styles.imageSize} />
            </View>
            <Text h4>{company.name}</Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  imageNameContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  imageContainer: {
    margin: SPACING_UNIT,
    borderRadius: 15,
    overflow: 'hidden'
  },
  imageSize: {
    height: 30,
    width: 30
  },
});

export default ListCompanyCard;
