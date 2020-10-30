import React, { Dimensions } from 'react';
import { View, StyleSheet } from 'react-native';
import BackgroundLeft from '../components/BackgroundLeft';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1
  },
  background: {
    position: 'absolute',
    left: -250,
    top: -100
  }
});

const Login = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <BackgroundLeft style={styles.background} />
    </View>
  );
};

export default Login;
