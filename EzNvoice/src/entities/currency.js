import { Toast } from 'native-base';
import ApiProvider from '../api/apiProvider';
import { ENDPOINT_CURRENCY } from '../api/endpoints';

class Currency {
  #provider = new ApiProvider();

  userConfig;

  id;

  name;

  sign;

  constructor(userConfig) {
    this.userConfig = userConfig;
  }

  async initFromId(id) {
    return this.#provider.get(`${ENDPOINT_CURRENCY}?id=${id}`, this.userConfig)
      .then((res) => {
        const currency = res.data.data;
        this.id = currency.id;
        this.name = currency.name;
        this.sign = currency.sign;
        return true;
      }).catch(() => {
        Toast.show({
          text: 'Erreur réseau',
          buttonText: 'Okay'
        });
        return false;
      });
  }

  initFromData(data) {
    this.id = data.id;
    this.name = data.name;
    this.sign = data.sign;
  }

}

export default Currency;
