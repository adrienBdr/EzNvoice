import React, { useContext, useEffect, useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { View, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { useForm, Controller } from 'react-hook-form';
import Icon from 'react-native-vector-icons/FontAwesome';
import BgLogin from '../components/BgLogin';
import { SCREEN_HEIGHT, SCREEN_WIDTH, SPACING_UNIT } from '../consts/spacing';
import {
  COLOR_PRIMARY, COLOR_SECONDARY
} from '../consts/colors';
import KeyboardBlurOverlay from '../components/KeyboardBlurOverlay';
import { TEXT_LOGIN_LOG_BUTTON, TEXT_LOGIN_REG_BUTTON } from '../consts/strings/fr';
import { NAVIGATE_HOME_NAVIGATOR, NAVIGATE_REGISTER } from '../consts/navigator';
import User from '../entities/user';
import AppContext from '../context';

const Login = ({ navigation }) => {
  const context = useContext(AppContext);
  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  });
  const [user] = useState(new User());

  const onSubmit = async (data) => {
    if (await user.signIn(data)) {
      if (await user.init()) {
        context.setUser(user);
        navigation.navigate(NAVIGATE_HOME_NAVIGATOR);
      } else {
        console.log('api error !');
      }
    } else {
      errors.password = { message: 'test' };
    }
  };

  return (
    <View style={styles.container}>
      <BgLogin style={styles.background} />
      <KeyboardBlurOverlay />
      <View style={styles.formContainer}>
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

        <View style={styles.formButtonsView}>
          <Button
            title={TEXT_LOGIN_LOG_BUTTON}
            buttonStyle={{ backgroundColor: COLOR_SECONDARY }}
            onPress={handleSubmit(onSubmit)}
          />

          <Button
            title={TEXT_LOGIN_REG_BUTTON}
            type="clear"
            titleStyle={{ color: COLOR_PRIMARY }}
            onPress={() => navigation.navigate(NAVIGATE_REGISTER)}
          />
        </View>
      </View>
    </View>
  );
};

const schema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
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
    flex: 0.72,
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
  formButtonsView: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    marginTop: SPACING_UNIT * 2,
    justifyContent: 'space-around'
  }
});

export default Login;
