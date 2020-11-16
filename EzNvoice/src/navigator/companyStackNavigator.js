import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  NAVIGATE_COMPANY,
  NAVIGATE_COMPANY_CREATE,
  NAVIGATE_COMPANY_DETAIL,
  NAVIGATE_PRODUCT_CREATE
} from '../consts/navigator';
import ListCompany from '../views/companies/listCompany';
import DetailCompany from '../views/companies/detailCompany';
import CreateCompany from '../views/companies/createCompany';
import CreateProduct from '../views/createProduct';

const Stack = createStackNavigator();

const CompanyStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={NAVIGATE_COMPANY}>
      <Stack.Screen
        name={NAVIGATE_COMPANY}
        options={{ headerShown: false }}
        component={ListCompany}
      />
      <Stack.Screen
        name={NAVIGATE_COMPANY_CREATE}
        options={({ route }) => ({
          title: route.params ? `Modifier ${route.params.company.name}` : 'Créer une entreprise'
        })}
        component={CreateCompany}
      />
      <Stack.Screen
        name={NAVIGATE_COMPANY_DETAIL}
        options={({ route }) => ({
          title: `Détails de ${route.params.company.name}`
        })}
        component={DetailCompany}
      />
      <Stack.Screen
        name={NAVIGATE_PRODUCT_CREATE}
        options={({ route }) => ({
          title: route.params.product ? 'Modifier un produit' : 'Créer un produit'
        })}
        component={CreateProduct}
      />
    </Stack.Navigator>
  );
};

export default CompanyStackNavigator;
