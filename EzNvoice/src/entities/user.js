import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';
import { Toast } from 'native-base';
import ApiProvider from '../api/apiProvider';
import {
  ENDPOINT_AUTH_LOGIN,
  ENDPOINT_AUTH_REGISTER,
  ENDPOINT_COMPANY_LIST,
  ENDPOINT_CURRENCY_LIST,
  ENDPOINT_USER
} from '../api/endpoints';
import Company from './company';
import Currency from './currency';
import DEFAULT_IMAGE from '../consts/images';

class User {
  #provider = new ApiProvider();

  id;

  image;

  firstName;

  lastName;

  email;

  token;

  config;

  initFromJson(data) {
    this.id = data.id;
    if (!data.image) {
      this.image = DEFAULT_IMAGE;
    } else {
      this.image = `https://ez-invoice-bucket.s3.eu-west-3.amazonaws.com/${data.image}`;
    }
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
  }

  async create(data) {
    return this.#provider.post(ENDPOINT_AUTH_REGISTER, {
      lastName: data.name.charAt(0).toUpperCase() + data.name.slice(1),
      firstName: data.surname.charAt(0).toUpperCase() + data.surname.slice(1),
      email: data.email,
      password: data.password,
    }).then((res) => {
      return res.data.message === 'New user created';
    }).catch(() => {
      Toast.show({
        text: 'Erreur réseau',
        buttonText: 'Okay'
      });
      return false;
    });
  }

  async update(data) {
    let newData;

    if (data.name) {
      const splicedName = data.name.split(' ');
      if (splicedName.length === 2) {
        newData = { firstName: splicedName[0], lastName: splicedName[1] };
      } else {
        newData = { firstName: splicedName[0], lastName: ' ' };
      }
    } else {
      newData = data;
    }

    return this.#provider.put(`${ENDPOINT_USER}?id=${this.id}`, newData, this.config).then(async (r) => {
      if (r.data.message === 'User updated') {
        await this.init();
        return true;
      }
      return false;
    }).catch(() => {
      Toast.show({
        text: 'Erreur réseau',
        buttonText: 'Okay'
      });
      return false;
    });
  }

  async signIn(data) {
    return this.#provider.post(ENDPOINT_AUTH_LOGIN, data).then((res) => {
      if (res.data.message === 'success') {
        this.token = res.data.data[0]?.token;
        this.storeToken(this.token);
        return true;
      }
      return false;
    }).catch(() => {
      Toast.show({
        text: 'Identifiants incorrectes !',
        buttonText: 'Okay'
      });
      return false;
    });
  }

  async init() {
    if (this.token) {
      this.config = {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      };

      return this.#provider.get(ENDPOINT_USER, this.config).then((r) => {
        if (r.data.data.length === 1) {
          this.initFromJson(r.data.data[0]);
          return true;
        }
        return false;
      }).catch(() => {
        Toast.show({
          text: 'Erreur réseau',
        });
        return false;
      });
    }
    return false;
  }

  async listCompanies(limit, offset) {
    return this.#provider.get(`${ENDPOINT_COMPANY_LIST}?limit=${limit}&offset=${offset}`, this.config)
      .then((r) => {
        const companies = [];
        r.data.data.forEach((company) => {
          const companyObj = new Company(this.config);
          companyObj.initFromData(company);
          companies.push(companyObj);
        });
        return companies;
      }).catch(() => {
        Toast.show({
          text: 'Erreur réseau',
          buttonText: 'Okay'
        });
        return null;
      });
  }

  async listCurrencies() {
    return this.#provider.get({ ENDPOINT_CURRENCY_LIST }, this.config)
      .then((r) => {
        const currencies = [];
        r.data.data.forEach((currency) => {
          const currencyObj = new Currency(this.config);
          currencyObj.initFromData(currency);
          currencies.push(currencyObj);
        });
        return currencies;
      }).catch(() => {
        Toast.show({
          text: 'Erreur réseau',
          buttonText: 'Okay'
        });
        return null;
      });
  }

  storeToken = async (appToken) => {
    try {
      await AsyncStorage.setItem('@token', appToken);
    } catch (e) {
      Toast.show({
        text: 'Erreur réseau',
      });
    }
  };

  deleteStoredToken = async () => {
    try {
      await AsyncStorage.removeItem('@token');
    } catch (e) {
      Toast.show({
        text: 'Erreur réseau',
      });
    }
  };

  connectWithStoredToken = async () => {
    const isLocalAuth = await LocalAuthentication.hasHardwareAsync();
    const isLocalAuthRegistered = isLocalAuth ? await LocalAuthentication.isEnrolledAsync() : false;

    try {
      if (isLocalAuthRegistered) {
        return LocalAuthentication.authenticateAsync().then(async (res) => {
          if (res) {
            const value = await AsyncStorage.getItem('@token');
            if (value !== null) {
              this.token = value;
              await this.init();
              return true;
            }
            return false;
          }
          return false;
        });
      }
      const value = await AsyncStorage.getItem('@token');
      if (value !== null) {
        this.token = value;
        await this.init();
        return true;
      }
      return false;

    } catch (e) {
      Toast.show({
        text: 'Erreur réseau',
      });
      return false;
    }
  }

}

export default User;
