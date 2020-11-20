import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Controller } from 'react-hook-form';
import { Input, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLOR_GREY_700, COLOR_SECONDARY } from '../../consts/colors';

const ModifiableInfo = ({
  item, name, submitFunction, control, errorMessage, small
}) => {
  const [isModify, setIsModify] = useState(false);

  return (
    isModify
      ? (
        <Controller
          name={name}
          defaultValue={item}
          control={control}
          render={({ value, onChange }) => (
            <Input
              clearButtonMode="never"
              rightIcon={(
                <Icon
                  name="close"
                  size={24}
                  color={COLOR_GREY_700}
                  onPress={() => { setIsModify(false); }}
                />
                )}
              onSubmitEditing={() => {
                submitFunction();
                setIsModify(false);
              }}
              errorMessage={errorMessage}
              inputContainerStyle={styles.inputContainerStyle}
              containerStyle={styles.containerStyle}
              value={value}
              onChangeText={(data) => onChange(data)}
            />
          )}
        />
      )
      : (
        <TouchableOpacity onPress={() => setIsModify(true)} style={styles.touchableContainer}>
          <Text style={small ? styles.smallText : styles.bigText}>{item}</Text>
        </TouchableOpacity>
      )
  );
};

const styles = StyleSheet.create({
  inputContainerStyle: {
    borderColor: COLOR_SECONDARY,
  },
  containerStyle: {
    width: '100%',
    padding: 0,
    minWidth: 250
  },
  touchableContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  smallText: {
    fontSize: 19,
  },
  bigText: {
    fontSize: 34,
    fontWeight: 'bold'
  }
});

export default ModifiableInfo;
