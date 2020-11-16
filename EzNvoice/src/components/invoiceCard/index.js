import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-elements';
import { SPACING_UNIT } from '../../consts/spacing';
import { COLOR_GREY_700 } from '../../consts/colors';

const InvoiceCard = ({ invoice }) => {
  const [customer, setCustomer] = useState({});
  const [currency, setCurrency] = useState({});

  useEffect(() => {
    invoice.getCustomer().then((ret) => {
      setCustomer(ret);
    });
    invoice.getCurrency().then((ret) => {
      setCurrency(ret);
    });
  }, [invoice, invoice.getCustomer]);

  return (
    <Card wrapperStyle={styles.invoicesCard} containerStyle={styles.invoicesCardContainer}>
      <Text style={styles.dateValueText}>{invoice.date}</Text>
      <Text h4 style={styles.customerNameText}>{customer?.name}</Text>
      <Text style={styles.dateValueText}>{`${invoice.total}${currency?.sign}`}</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  invoicesCardContainer: {
    width: '100%',
    margin: 0,
    marginTop: SPACING_UNIT
  },
  invoicesCard: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateValueText: {
    fontSize: 18,
    color: COLOR_GREY_700,
    fontWeight: 'bold'
  },
  customerNameText: {
    marginHorizontal: SPACING_UNIT * 2
  }
});

export default InvoiceCard;
