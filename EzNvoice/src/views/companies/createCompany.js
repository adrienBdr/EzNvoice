import React, {
  useContext, useEffect, useRef, useState
} from 'react';
import {
  Keyboard, StyleSheet, View
} from 'react-native';
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import AppContext from '../../context';
import Company from '../../entities/company';
import MyImagePicker from '../../components/MyImagePicker';
import { SPACING_UNIT } from '../../consts/spacing';
import { COLOR_SECONDARY } from '../../consts/colors';
import KeyboardBlurOverlay from '../../components/KeyboardBlurOverlay';
import BgRight from '../../components/Backgrounds/BgRight';

const CreateCompany = ({ navigation, route }) => {
  const context = useContext(AppContext);
  const { user } = context;
  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  });
  const { company } = route.params ? route.params : {};
  const [usingCompany, setUsingCompany] = useState(new Company(user.config));
  const [isKeyboard, setIsKeyboard] = useState(false);
  const imagePickerRef = useRef();

  useEffect(() => {
    if (typeof company !== 'undefined') {
      setUsingCompany(company);
    }
    Keyboard.addListener('keyboardDidShow', () => setIsKeyboard(true));
    Keyboard.addListener('keyboardDidHide', () => setIsKeyboard(false));
  }, [company]);

  const onSubmit = async (data) => {
    const dataWithImage = imagePickerRef.current.didModify() || typeof usingCompany.id !== 'undefined'
      ? { ...data, image: imagePickerRef.current.getImage() }
      : data;

    if (typeof usingCompany.id !== 'undefined') {
      await usingCompany.update(dataWithImage);
    } else {
      await usingCompany.create(dataWithImage);
    }
    context.setIsCompaniesModified(true);
    navigation.pop();
  };

  return (
    <View style={styles.defaultContainer}>
      <BgRight />
      <MyImagePicker ref={imagePickerRef} imageLink={company ? company.image : null} />
      <KeyboardBlurOverlay />
      <View style={isKeyboard ? styles.formViewContainerKeyboard : styles.formViewContainer}>
        <Controller
          name="name"
          defaultValue={company ? company.name : ''}
          control={control}
          render={({ value, onChange }) => (
            <Input
              placeholder="Nom"
              leftIcon={(
                <Icon
                  name="building"
                  size={24}
                  color={COLOR_SECONDARY}
                />
              )}
              errorMessage={errors.name?.message}
              inputContainerStyle={styles.inputContainerStyle}
              containerStyle={styles.containerStyle}
              value={value}
              onChangeText={(data) => onChange(data)}
            />
          )}
        />

        <Controller
          name="address"
          defaultValue={company ? company.address : ''}
          control={control}
          render={({ value, onChange }) => (
            <Input
              placeholder="Adresse"
              leftIcon={(
                <Icon
                  name="home"
                  size={24}
                  color={COLOR_SECONDARY}
                />
              )}
              errorMessage={errors.address?.message}
              inputContainerStyle={styles.inputContainerStyle}
              containerStyle={styles.containerStyle}
              value={value}
              onChangeText={(data) => onChange(data)}
            />
          )}
        />

        <Controller
          name="email"
          defaultValue={company ? company.email : ''}
          control={control}
          render={({ value, onChange }) => (
            <Input
              placeholder="Email"
              leftIcon={(
                <Icon
                  name="envelope"
                  size={24}
                  color={COLOR_SECONDARY}
                />
              )}
              errorMessage={errors.email?.message}
              inputContainerStyle={styles.inputContainerStyle}
              containerStyle={styles.containerStyle}
              value={value}
              onChangeText={(data) => onChange(data)}
            />
          )}
        />

        <Controller
          name="phone"
          defaultValue={company ? company.phone : ''}
          control={control}
          render={({ value, onChange }) => (
            <Input
              placeholder="Téléphone"
              leftIcon={(
                <Icon
                  name="mobile"
                  size={24}
                  color={COLOR_SECONDARY}
                />
              )}
              errorMessage={errors.phone?.message}
              inputContainerStyle={styles.inputContainerStyle}
              containerStyle={styles.containerStyle}
              value={value}
              onChangeText={(data) => onChange(data)}
            />
          )}
        />
      </View>

      <View style={{ marginBottom: SPACING_UNIT * 3 }}>
        <Button
          title="Enregistrer"
          buttonStyle={{ backgroundColor: COLOR_SECONDARY }}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  );
};

const schema = yup.object().shape({
  name: yup.string().required(),
  address: yup.string().required(),
  email: yup.string().required(),
});

const styles = StyleSheet.create({
  formViewContainer: {
    width: '100%',
    padding: SPACING_UNIT * 3
  },
  formViewContainerKeyboard: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    padding: SPACING_UNIT * 3
  },
  defaultContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING_UNIT,
  },
  inputContainerStyle: {
    borderColor: COLOR_SECONDARY,
  },
  containerStyle: {
    marginBottom: SPACING_UNIT * 2
  },
});

export default CreateCompany;
