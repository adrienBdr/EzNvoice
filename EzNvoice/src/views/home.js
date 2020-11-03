import React, { useContext, useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text } from 'react-native-elements';
import AppContext from '../context';
import { SCREEN_HEIGHT, SCREEN_WIDTH, SPACING_UNIT } from '../consts/spacing';
import { COLOR_SECONDARY } from '../consts/colors';

const Home = ({ navigation }) => {
  const context = useContext(AppContext);

  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', flex: 0.2, marginTop: SPACING_UNIT }}>
        <View style={{
          flex: 0.4, alignItems: 'center', justifyContent: 'center'
        }}
        >
          <View style={{
            margin: SPACING_UNIT, borderRadius: 100, overflow: 'hidden'
          }}
          >
            <Image source={{ uri: context.user.image }} style={{ width: 120, height: 120 }} />
          </View>
        </View>
        <View style={{
          flex: 0.6, justifyContent: 'center'
        }}
        >
          <Text h3>{`${context.user.lastName} ${context.user.firstName}`}</Text>
          <Text style={{ fontSize: 18 }}>{`${context.user.email}`}</Text>
        </View>
      </View>
      <View style={{ flex: 0.35, backgroundColor: 'yellow' }} />
      <View style={{ flex: 0.35, backgroundColor: 'blue' }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
});

export default Home;
