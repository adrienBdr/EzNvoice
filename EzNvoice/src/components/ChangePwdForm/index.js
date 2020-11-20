import React, { useEffect, useState } from 'react';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Keyboard, StyleSheet, View } from 'react-native';
import { COLOR_GREY_700, COLOR_SECONDARY } from '../../consts/colors';
import ProfileTile from '../ProfileTile';
import KeyboardBlurOverlay from '../KeyboardBlurOverlay';
import { SPACING_UNIT } from '../../consts/spacing';

const ChangePwdForm = ({ endModifs, onSubmit }) => {
  const [isKeyboard, setIsKeyboard] = useState(false);
  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => setIsKeyboard(true));
    Keyboard.addListener('keyboardDidHide', () => setIsKeyboard(false));
  }, []);

  return (
    <View style={isKeyboard ? styles.defaultContainerWithKeyboard : styles.defaultContainer}>
      <KeyboardBlurOverlay />
      <ProfileTile iconName="lock">
        <Controller
          name="oldPassword"
          defaultValue=""
          control={control}
          render={({ value, onChange }) => (
            <Input
              secureTextEntry
              placeholder="Mot de pass actuel"
              clearButtonMode="never"
              rightIcon={(
                <Icon
                  name="close"
                  size={24}
                  color={COLOR_GREY_700}
                  onPress={() => { endModifs(); }}
                />
            )}
              errorMessage={errors.oldPassword?.message}
              inputContainerStyle={styles.inputContainerStyle}
              containerStyle={styles.containerStyle}
              value={value}
              onChangeText={(data) => onChange(data)}
            />
          )}
        />
      </ProfileTile>

      <ProfileTile iconName="lock">
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ value, onChange }) => (
            <Input
              secureTextEntry
              placeholder="Nouveau mot de pass"
              clearButtonMode="never"
              rightIcon={(
                <Icon
                  name="close"
                  size={24}
                  color={COLOR_GREY_700}
                  onPress={() => { endModifs(); }}
                />
                )}
              errorMessage={errors.oldPassword?.message}
              inputContainerStyle={styles.inputContainerStyle}
              containerStyle={styles.containerStyle}
              value={value}
              onChangeText={(data) => onChange(data)}
            />
          )}
        />
      </ProfileTile>

      <ProfileTile iconName="lock">
        <Controller
          name="confirmPassword"
          control={control}
          defaultValue=""
          render={({ value, onChange }) => (
            <Input
              secureTextEntry
              placeholder="Confirmation"
              clearButtonMode="never"
              rightIcon={(
                <Icon
                  name="close"
                  size={24}
                  color={COLOR_GREY_700}
                  onPress={() => { endModifs(); }}
                />
                  )}
              onSubmitEditing={handleSubmit(async (data) => {
                await onSubmit({ password: data.password });
                endModifs();
              })}
              errorMessage={errors.oldPassword?.message}
              inputContainerStyle={styles.inputContainerStyle}
              containerStyle={styles.containerStyle}
              value={value}
              onChangeText={(data) => onChange(data)}
            />
          )}
        />
      </ProfileTile>

    </View>
  );
};

const schema = yup.object().shape({
  oldPassword: yup.string().required(),
  password: yup.string().required(),
  confirmPassword: yup.string().required()
    .oneOf([yup.ref('password'), null], 'Password and confirmation musts match'),
});

const styles = StyleSheet.create({
  defaultContainer: {
    padding: SPACING_UNIT * 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  defaultContainerWithKeyboard: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: SPACING_UNIT * 2,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainerStyle: {
    borderColor: COLOR_SECONDARY,
  },
  containerStyle: {
    width: '100%',
    padding: 0,
    minWidth: 250
  },
});

export default ChangePwdForm;
