import React, { useContext, useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text } from 'react-native-elements';
import AppContext from '../context';
import { SPACING_UNIT } from '../consts/spacing';
import CardNumericInfo from '../components/CardNumericInfo';
import BgLeft from '../components/Backgrounds/BgLeft';

const Home = ({ navigation }) => {
  const context = useContext(AppContext);
  const { user } = context;

  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
    });
    context.setRemoveAvoidBackToLogin(() => {
      navigation.removeListener('beforeRemove');
    });
  }, [context, navigation]);

  return (
    <View style={styles.container}>
      <BgLeft />

      <View style={styles.profileContainer}>
        <View style={styles.profileImageContainer}>
          <View style={styles.profileImage}>
            <Image source={{ uri: user.image }} style={styles.profileImageSize} />
          </View>
        </View>
        <View style={styles.profileInfosContainer}>
          <Text h3>{`${user.lastName} ${user.firstName}`}</Text>
          <Text style={styles.profileEmailText}>{`${user.email}`}</Text>
        </View>
      </View>

      <View style={styles.rowOneContainer}>
        <View style={styles.cardContainer}>
          <CardNumericInfo title="Entreprises" data={3} />
        </View>
        <View style={styles.cardContainer}>
          <CardNumericInfo title="Produits" data={12} />
        </View>
      </View>

      <View style={styles.rowTwoContainer}>
        <View style={styles.cardContainer}>
          <CardNumericInfo title="Clients" data={23} />
        </View>
        <View style={styles.cardContainer}>
          <CardNumericInfo title="Factures" data={26} />
        </View>
      </View>

      <View style={styles.rowThreeContainer}>
        <CardNumericInfo title="Chiffre d'affaires total" data={25000} size="big" />
      </View>

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
  profileContainer: {
    flexDirection: 'row',
    flex: 0.2,
    marginTop: SPACING_UNIT,
    paddingTop: SPACING_UNIT
  },
  profileImageContainer: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  profileInfosContainer: {
    flex: 0.6,
    justifyContent: 'center'
  },
  profileImage: {
    margin: SPACING_UNIT,
    borderRadius: 100,
    overflow: 'hidden'
  },
  profileImageSize: {
    width: 120, height: 120
  },
  profileEmailText: {
    fontSize: 18
  },
  rowOneContainer: {
    flex: 0.23,
    flexDirection: 'row'
  },
  rowTwoContainer: {
    flex: 0.23,
    flexDirection: 'row'
  },
  rowThreeContainer: {
    flex: 0.3
  },
  cardContainer: {
    flex: 0.5,
    justifyContent: 'center'
  }
});

export default Home;
