import ApiProvider from '../api/apiProvider';
import { ENDPOINT_PRODUCT } from '../api/endpoints';

class Product {
  #provider = new ApiProvider();

  userConfig;

  id;

  name;

  price;

  companyId;

  currencyId;

  constructor(userConfig) {
    this.userConfig = userConfig;
  }

  async initFromId(id) {
    return this.#provider.get(`${ENDPOINT_PRODUCT}?id=${id}`, this.userConfig)
      .then((res) => {
        const product = res.data.data[0];
        this.currencyId = product.currency_id;
        this.id = product.id;
        this.name = product.name;
        this.price = product.price;
        return true;
      }).catch((e) => {
        console.log(e.response);
        return false;
      });
  }

  initFromData(data) {
    this.currencyId = data.currency_id;
    this.id = data.id;
    this.name = data.name;
    this.price = data.price;
  }

  async create(data) {
    return this.#provider.post(ENDPOINT_PRODUCT, data, this.userConfig).then((r) => {
      return r.data.message === 'New product created';
    }).catch((e) => {
      console.log(e.response);
      return false;
    });
  }

  async delete() {
    return this.#provider.delete(`${ENDPOINT_PRODUCT}?id=${this.id}`, this.userConfig).then((r) => {
      return r.data.message === 'Product deleted';
    }).catch((e) => {
      console.log(e.response);
      return false;
    });
  }

  async update(data) {
    return this.#provider.put(`${ENDPOINT_PRODUCT}?id=${this.id}`, data, this.userConfig).then((r) => {
      return r.data.message === 'Product updated';
    }).catch((e) => {
      console.log(e.response);
      return false;
    });
  }

}

export default Product;
