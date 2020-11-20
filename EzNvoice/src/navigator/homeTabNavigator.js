import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  NAVIGATE_COMPANY, NAVIGATE_HOME, NAVIGATE_INVOICE, NAVIGATE_PROFILE
} from '../consts/navigator';
import Home from '../views/home';
import { COLOR_GREY_400, COLOR_SECONDARY } from '../consts/colors';
import CompanyStackNavigator from './companyStackNavigator';
import Profile from '../views/profile';

const Tab = createBottomTabNavigator();

const HomeTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={NAVIGATE_HOME}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case NAVIGATE_HOME:
              iconName = 'home';
              break;
            case NAVIGATE_COMPANY:
              iconName = 'institution';
              break;
            case NAVIGATE_INVOICE:
              iconName = 'book';
              break;
            case NAVIGATE_PROFILE:
              iconName = 'user';
              break;
            default:
              iconName = 'book';
          }

          return (
            <Icon
              name={iconName}
              size={size}
              color={color}
            />
          );
        }
      })}
      tabBarOptions={{
        activeTintColor: COLOR_SECONDARY,
        inactiveTintColor: COLOR_GREY_400,
        showLabel: false
      }}
    >
      <Tab.Screen name={NAVIGATE_COMPANY} component={CompanyStackNavigator} />
      <Tab.Screen name={NAVIGATE_HOME} component={Home} />
      <Tab.Screen name={NAVIGATE_PROFILE} component={Profile} />
    </Tab.Navigator>
  );
};

export default HomeTabNavigator;
