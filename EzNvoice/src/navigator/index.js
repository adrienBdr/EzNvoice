import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NAVIGATE_LOGIN, NAVIGATE_REGISTER } from '../consts/navigator';
import Login from '../views/login';
import Register from '../views/register';

const Stack = createStackNavigator();

const NavigationTree = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={NAVIGATE_LOGIN}>
        <Stack.Screen
          name={NAVIGATE_LOGIN}
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={NAVIGATE_REGISTER}
          component={Register}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationTree;
