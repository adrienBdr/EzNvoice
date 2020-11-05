import React, {
  useCallback, useContext, useRef
} from 'react';
import { StyleSheet, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Card, Text } from 'react-native-elements';
import AppContext from '../context';
import { SPACING_UNIT } from '../consts/spacing';
import MyFlatList from '../components/MyFlatList';
import { COLOR_GREY_700, COLOR_PRIMARY_DARK, COLOR_PRIMARY_LIGHT } from '../consts/colors';
import ViewNumericInfo from '../components/ViewNumericInfo';

const Company = ({ navigation }) => {
  const context = useContext(AppContext);
  const { user } = context;
  const refFlatList = useRef();

  useFocusEffect(
    useCallback(() => {
      refFlatList.current.refresh();
    }, [navigation])
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text h1> Vos entreprises</Text>
      </View>
      <View style={{ flex: 0.9 }}>
        <MyFlatList
          renderItem={({ item }) => (
            <Card>
              <Card.Title><Text h4>{item.name}</Text></Card.Title>
              <Card.Divider />
              <View style={{ height: 140 }}>
                <View style={{ flexDirection: 'row', flex: 0.5 }}>
                  <ViewNumericInfo containerStyle={styles.numericInfoView} title="Clients" data={32} />
                  <ViewNumericInfo containerStyle={styles.numericInfoView} title="Produits" data={6} />
                </View>
                <View style={{
                  flex: 0.5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'
                }}
                >
                  <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Chiffre d'affaires :</Text>
                  <Text style={{
                    textAlign: 'center',
                    color: COLOR_PRIMARY_DARK,
                    fontSize: 24
                  }}
                  >
                    145 000 €
                  </Text>
                </View>
              </View>
            </Card>
          )}
          source={(limit, offset) => user.listCompanies(limit, offset)}
          ref={refFlatList}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  titleContainer: {
    flex: 0.1,
    marginTop: SPACING_UNIT * 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  numericInfoView: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Company;
