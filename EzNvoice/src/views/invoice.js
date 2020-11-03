import React, { useContext, useEffect } from 'react';
import { View } from 'react-native';
import AppContext from '../context';

const Invoice = ({ navigation }) => {
  const context = useContext(AppContext);

  useEffect(() => {
    console.log(JSON.stringify(context.user));
  });

  return (
    <View style={{ backgroundColor: 'red' }} />
  );
};

export default Invoice;
