import React, {
  useContext, useEffect, useState
} from 'react';
import {
  Keyboard, StyleSheet, View
} from 'react-native';
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import AppContext from '../context';
import { SPACING_UNIT } from '../consts/spacing';
import { COLOR_PRIMARY, COLOR_SECONDARY } from '../consts/colors';
import KeyboardBlurOverlay from '../components/KeyboardBlurOverlay';
import Product from '../entities/product';

const CreateProduct = ({ navigation, route }) => {
  const context = useContext(AppContext);
  const { user } = context;
  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  });
  const { company, product } = route.params;
  const [usingProduct, setUsingProduct] = useState(new Product(user.config));
  const [isKeyboard, setIsKeyboard] = useState(false);

  useEffect(() => {
    if (typeof product !== 'undefined') {
      setUsingProduct(product);
    }
    Keyboard.addListener('keyboardDidShow', () => setIsKeyboard(true));
    Keyboard.addListener('keyboardDidHide', () => setIsKeyboard(false));
  });

  const onSubmit = async (data) => {
    if (typeof usingProduct.id !== 'undefined') {
      await usingProduct.update({ ...data, company_id: company.id, currency_id: 1 });
    } else {
      await usingProduct.create({ ...data, company_id: company.id, currency_id: 1 });
    }
    context.setIsProductsModified(true);
    navigation.pop();
  };

  return (
    <View style={styles.defaultContainer}>
      <View style={styles.imageContainer}>
        <Icon
          name="glass"
          size={150}
          color={COLOR_PRIMARY}
        />
      </View>
      <KeyboardBlurOverlay />
      <View style={isKeyboard ? styles.formViewContainerKeyboard : styles.formViewContainer}>
        <Controller
          name="name"
          defaultValue={product ? product.name : ''}
          control={control}
          render={({ value, onChange }) => (
            <Input
              placeholder="Nom du produit"
              leftIcon={(
                <Icon
                  name="tag"
                  size={24}
                  color={COLOR_SECONDARY}
                />
              )}
              errorMessage={errors.name?.message}
              inputContainerStyle={styles.inputContainerStyle}
              containerStyle={styles.containerStyle}
              value={value}
              onChangeText={(data) => onChange(data)}
            />
          )}
        />

        <Controller
          name="options"
          defaultValue={product ? product.options : ''}
          control={control}
          render={({ value, onChange }) => (
            <Input
              placeholder="Options"
              leftIcon={(
                <Icon
                  name="gear"
                  size={24}
                  color={COLOR_SECONDARY}
                />
              )}
              errorMessage={errors.options?.message}
              inputContainerStyle={styles.inputContainerStyle}
              containerStyle={styles.containerStyle}
              value={value}
              onChangeText={(data) => onChange(data)}
            />
          )}
        />

        <Controller
          name="price"
          defaultValue={product ? product.price.toString() : ''}
          control={control}
          render={({ value, onChange }) => (
            <Input
              placeholder="Prix"
              leftIcon={(
                <Icon
                  name="money"
                  size={24}
                  color={COLOR_SECONDARY}
                />
              )}
              errorMessage={errors.price?.message}
              inputContainerStyle={styles.inputContainerStyle}
              containerStyle={styles.containerStyle}
              value={value}
              onChangeText={(data) => onChange(data)}
            />
          )}
        />

      </View>

      <View style={{ marginBottom: SPACING_UNIT * 3 }}>
        <Button
          title="Enregistrer"
          buttonStyle={{ backgroundColor: COLOR_SECONDARY }}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  );
};

const schema = yup.object().shape({
  name: yup.string().required(),
  price: yup.number().required()
});

const styles = StyleSheet.create({
  formViewContainer: {
    width: '100%',
    padding: SPACING_UNIT * 3,
  },
  formViewContainerKeyboard: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    padding: SPACING_UNIT * 3
  },
  defaultContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: SPACING_UNIT,
  },
  inputContainerStyle: {
    borderColor: COLOR_SECONDARY,
  },
  containerStyle: {
    marginBottom: SPACING_UNIT * 2
  },
  imageContainer: {
    width: 180,
    height: 180,
    alignItems: 'center',
  },
});

export default CreateProduct;
