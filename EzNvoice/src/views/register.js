import React from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { View, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { useForm, Controller } from 'react-hook-form';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SCREEN_HEIGHT, SCREEN_WIDTH, SPACING_UNIT } from '../consts/spacing';
import {
  COLOR_PRIMARY, COLOR_SECONDARY
} from '../consts/colors';
import KeyboardBlurOverlay from '../components/KeyboardBlurOverlay';
import {
  TEXT_REGISTER_LOG_BUTTON,
  TEXT_REGISTER_REG_BUTTON
} from '../consts/strings/fr';
import BgRegister from '../components/BgRegister';
import { NAVIGATE_LOGIN } from '../consts/navigator';
import User from '../entities/user';

const Register = ({ navigation }) => {
  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    const user = new User();

    if (await user.create(data)) {
      navigation.navigate(NAVIGATE_LOGIN);
    } else {
      console.log('Error');
    }
  };

  return (
    <View style={styles.container}>
      <BgRegister style={styles.background} />
      <KeyboardBlurOverlay />
      <View style={styles.formContainer}>

        <View style={styles.nameContainerStyle}>
          <Controller
            name="name"
            defaultValue=""
            control={control}
            render={({ value, onChange }) => (
              <Input
                placeholder="Nom"
                leftIcon={(
                  <Icon
                    name="user"
                    size={24}
                    color={COLOR_SECONDARY}
                  />
                )}
                errorMessage={errors.name?.message}
                inputContainerStyle={styles.inputContainerStyle}
                containerStyle={styles.inputsNameContainerStyle}
                value={value}
                onChangeText={(data) => onChange(data)}
              />
            )}
          />

          <Controller
            name="surname"
            defaultValue=""
            control={control}
            render={({ value, onChange }) => (
              <Input
                placeholder="Prénom"
                leftIcon={(
                  <Icon
                    name="user"
                    size={24}
                    color={COLOR_SECONDARY}
                  />
                )}
                errorMessage={errors.surname?.message}
                inputContainerStyle={styles.inputContainerStyle}
                containerStyle={styles.inputsNameContainerStyle}
                value={value}
                onChangeText={(data) => onChange(data)}
              />
            )}
          />
        </View>

        <Controller
          name="email"
          defaultValue=""
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
          name="password"
          defaultValue=""
          control={control}
          render={({ value, onChange }) => (
            <Input
              placeholder="Password"
              leftIcon={(
                <Icon
                  name="lock"
                  size={24}
                  color={COLOR_SECONDARY}
                />
              )}
              secureTextEntry
              errorMessage={errors.password?.message}
              inputContainerStyle={styles.inputContainerStyle}
              containerStyle={styles.containerStyle}
              value={value}
              onChangeText={(data) => onChange(data)}
            />
          )}
        />

        <Controller
          name="confirmPassword"
          defaultValue=""
          control={control}
          render={({ value, onChange }) => (
            <Input
              placeholder="Confirm Password"
              leftIcon={(
                <Icon
                  name="lock"
                  size={24}
                  color={COLOR_SECONDARY}
                />
              )}
              secureTextEntry
              errorMessage={errors.confirmPassword?.message}
              inputContainerStyle={styles.inputContainerStyle}
              containerStyle={styles.containerStyle}
              value={value}
              onChangeText={(data) => onChange(data)}
            />
          )}
        />

        <View style={styles.formButtonsView}>
          <Button
            title={TEXT_REGISTER_REG_BUTTON}
            buttonStyle={{ backgroundColor: COLOR_SECONDARY }}
            onPress={handleSubmit(onSubmit)}
          />

          <Button
            title={TEXT_REGISTER_LOG_BUTTON}
            type="clear"
            titleStyle={{ color: COLOR_PRIMARY }}
            onPress={() => navigation.navigate(NAVIGATE_LOGIN)}
          />
        </View>
      </View>
    </View>
  );
};

const schema = yup.object().shape({
  name: yup.string().required(),
  surname: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  confirmPassword: yup.string().required()
    .oneOf([yup.ref('password'), null], 'Password and confirmation musts match'),
});

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH
  },
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column-reverse'
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 0.80,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING_UNIT * 6
  },
  inputContainerStyle: {
    borderColor: COLOR_SECONDARY,
  },
  containerStyle: {
    marginBottom: SPACING_UNIT * 2
  },
  inputsNameContainerStyle: {
    marginBottom: SPACING_UNIT * 2,
    flex: 0.5
  },
  nameContainerStyle: {
    display: 'flex', flexDirection: 'row'
  },
  formButtonsView: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    marginTop: SPACING_UNIT * 2,
    justifyContent: 'space-around'
  }
});

export default Register;
