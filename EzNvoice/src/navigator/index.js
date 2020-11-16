import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  NAVIGATE_COMPANY_CREATE,
  NAVIGATE_HOME_NAVIGATOR, NAVIGATE_LOGIN, NAVIGATE_PRODUCT, NAVIGATE_PRODUCT_CREATE, NAVIGATE_REGISTER
} from '../consts/navigator';
import Login from '../views/login';
import Register from '../views/register';
import HomeTabNavigator from './homeTabNavigator';

const Stack = createStackNavigator();

const NavigationTree = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={NAVIGATE_LOGIN}>
        <Stack.Screen
          name={NAVIGATE_LOGIN}
          component={Login}
        />
        <Stack.Screen
          name={NAVIGATE_REGISTER}
          component={Register}
        />
        <Stack.Screen
          name={NAVIGATE_HOME_NAVIGATOR}
          component={HomeTabNavigator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationTree;
