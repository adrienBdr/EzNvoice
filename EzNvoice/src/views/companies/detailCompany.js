import React, {
  useCallback, useContext, useRef, useState
} from 'react';
import {
  Image, ScrollView, StyleSheet, View
} from 'react-native';
import {
  Card, Divider, PricingCard, Text
} from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ActionButton from 'react-native-action-button';
import Company from '../../entities/company';
import AppContext from '../../context';
import { SPACING_UNIT } from '../../consts/spacing';
import MyFlatList from '../../components/MyFlatList';
import {
  COLOR_GREY_700, COLOR_PRIMARY, COLOR_PRIMARY_LIGHT, COLOR_SECONDARY, COLOR_WHITE
} from '../../consts/colors';
import InvoiceCard from '../../components/invoiceCard';
import { NAVIGATE_COMPANY_CREATE } from '../../consts/navigator';

const DetailCompany = ({ navigation, route }) => {
  const context = useContext(AppContext);
  const { user } = context;
  const [company, setCompany] = useState({});
  const refFlatListProd = useRef();
  const refFlatListCli = useRef();
  const refFlatListInvoices = useRef();

  useFocusEffect(
    useCallback(() => {
      const newCompany = new Company(user.config);
      newCompany.initFromId(route.params.company.id).then(() => {
        setCompany(newCompany);
        refFlatListProd.current.refresh();
        refFlatListCli.current.refresh();
        refFlatListInvoices.current.refresh();
      });
    }, [route.params.company.id, user.config])
  );

  return (
    <View style={{ display: 'flex', flex: 1 }}>
      <ScrollView style={styles.container}>

        <View style={styles.profileContainer}>
          <View style={styles.profileImageContainer}>
            <View style={styles.profileImage}>
              <Image source={{ uri: company.image }} style={styles.profileImageSize} />
            </View>
          </View>
          <View style={styles.profileInfosContainer}>
            <Text h3>{company.name}</Text>
            <Text style={styles.profileEmailText}>{company.address}</Text>
            <Text style={styles.profileEmailText}>{company.phone}</Text>
            <Text style={styles.profileEmailText}>{company.email}</Text>
          </View>
        </View>

        <Divider />

        <View style={styles.containerData}>
          <Text h3 style={styles.containerDataTitle}>Produits</Text>
          <MyFlatList
            renderItem={({ item }) => (
              <PricingCard
                color={COLOR_SECONDARY}
                titleStyle={styles.productCardTitle}
                price={`${item.price}$`}
                button={{ title: 'Modifier' }}
                title={item.name}
                info={item.options.split(';')}
              />
            )}
            source={(limit, offset) => company.listProducts(limit, offset)}
            horizontal
            ref={refFlatListProd}
          />
        </View>

        <View style={styles.containerData}>
          <Text h3 style={styles.containerDataTitle}>Clients</Text>
          <MyFlatList
            renderItem={({ item }) => (
              <Card wrapperStyle={styles.clientCard}>
                <Icon
                  name="user"
                  size={60}
                  color={COLOR_SECONDARY}
                />
                <Text h4>{item.name}</Text>
              </Card>
            )}
            source={(limit, offset) => company.listCustomers(limit, offset)}
            horizontal
            ref={refFlatListCli}
          />
        </View>

        <View style={styles.containerData}>
          <Text h3 style={styles.containerDataTitle}>Factures</Text>
          <MyFlatList
            renderItem={({ item }) => (
              <InvoiceCard invoice={item} />
            )}
            source={(limit, offset) => company.listInvoices(limit, offset)}
            ref={refFlatListInvoices}
          />
        </View>

      </ScrollView>

      <ActionButton offsetX={10} offsetY={10} buttonColor={COLOR_PRIMARY}>
        <ActionButton.Item buttonColor={COLOR_PRIMARY_LIGHT} title="Créer une facture">
          <Icon
            name="book"
            size={22}
            color={COLOR_WHITE}
          />
        </ActionButton.Item>
        <ActionButton.Item buttonColor={COLOR_PRIMARY_LIGHT} title="Créer un client">
          <Icon
            name="user"
            size={22}
            color={COLOR_WHITE}
          />
        </ActionButton.Item>
        <ActionButton.Item buttonColor={COLOR_PRIMARY_LIGHT} title="Créer un produit">
          <Icon
            name="glass"
            size={22}
            color={COLOR_WHITE}
          />
        </ActionButton.Item>
        <ActionButton.Item buttonColor={COLOR_SECONDARY} title="Modifier l'entreprise" onPress={() => navigation.navigate(NAVIGATE_COMPANY_CREATE, { company })}>
          <Icon
            name="pencil"
            size={22}
            color={COLOR_WHITE}
          />
        </ActionButton.Item>
      </ActionButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    marginBottom: SPACING_UNIT * 4
  },
  profileContainer: {
    flexDirection: 'row',
    paddingTop: SPACING_UNIT,
    marginVertical: SPACING_UNIT
  },
  profileImageContainer: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfosContainer: {
    flex: 0.7,
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
    fontSize: 16,
    marginVertical: SPACING_UNIT / 2
  },
  containerData: {
    alignItems: 'center',
    marginVertical: SPACING_UNIT,
  },
  containerDataTitle: {
    color: COLOR_GREY_700
  },
  productCardTitle: {
    fontSize: 24
  },
  clientCard: {
    alignItems: 'center',
    marginBottom: SPACING_UNIT,
  }
});

export default DetailCompany;
