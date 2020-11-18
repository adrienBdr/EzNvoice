import React, {
  useContext, useEffect, useState
} from 'react';
import {
  Keyboard, StyleSheet, View
} from 'react-native';
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import AppContext from '../context';
import { SPACING_UNIT } from '../consts/spacing';
import { COLOR_PRIMARY, COLOR_SECONDARY } from '../consts/colors';
import KeyboardBlurOverlay from '../components/KeyboardBlurOverlay';
import Customer from '../entities/customer';
import BgLeft from '../components/Backgrounds/BgLeft';

const CreateCustomer = ({ navigation, route }) => {
  const context = useContext(AppContext);
  const { user } = context;
  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  });
  const { company, customer } = route.params;
  const [usingCustomer, setUsingCustomer] = useState(new Customer(user.config));
  const [isKeyboard, setIsKeyboard] = useState(false);

  useEffect(() => {
    if (typeof customer !== 'undefined') {
      setUsingCustomer(customer);
    }
    Keyboard.addListener('keyboardDidShow', () => setIsKeyboard(true));
    Keyboard.addListener('keyboardDidHide', () => setIsKeyboard(false));
  });

  const onSubmit = async (data) => {
    if (typeof usingCustomer.id !== 'undefined') {
      await usingCustomer.update({ ...data, company_id: company.id });
    } else {
      await usingCustomer.create({ ...data, company_id: company.id });
    }
    context.setIsCustomersModified(true);
    navigation.pop();
  };

  return (
    <View style={styles.defaultContainer}>
      <BgLeft />
      <View style={styles.imageContainer}>
        <Icon
          name="user"
          size={150}
          color={COLOR_PRIMARY}
        />
      </View>
      <KeyboardBlurOverlay />
      <View style={isKeyboard ? styles.formViewContainerKeyboard : styles.formViewContainer}>
        <Controller
          name="name"
          defaultValue={customer ? customer.name : ''}
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
          defaultValue={customer ? customer.address : ''}
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
          defaultValue={customer ? customer.email : ''}
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
          defaultValue={customer ? customer.phone : ''}
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
    padding: SPACING_UNIT * 3,
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
  imageContainer: {
    width: 180,
    height: 180,
    alignItems: 'center',
  },
});

export default CreateCustomer;
