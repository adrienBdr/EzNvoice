import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { COLOR_GREY_200, COLOR_SECONDARY } from '../../consts/colors';
import { SPACING_UNIT } from '../../consts/spacing';

const ProfileTile = ({ iconName, onPress, children }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.defaultContainer}>
      <Icon
        name={iconName}
        size={22}
        color={COLOR_SECONDARY}
        style={styles.iconStyle}
      />
      <View style={styles.childrenContainer}>
        {children}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  defaultContainer: {
    width: '90%',
    backgroundColor: COLOR_GREY_200,
    borderColor: COLOR_SECONDARY,
    borderWidth: 0.4,
    padding: SPACING_UNIT * 2,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING_UNIT
  },
  childrenContainer: {
    flex: 0.9, alignItems: 'center'
  },
  iconStyle: {
    flex: 0.1
  }
});

export default ProfileTile;
