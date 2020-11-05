import ApiProvider from '../api/apiProvider';
import { ENDPOINT_CUSTOMER } from '../api/endpoints';

class Customer {
  #provider = new ApiProvider();

  userConfig;

  id;

  name;

  address;

  email;

  phone;

  companyId;

  constructor(userConfig) {
    this.userConfig = userConfig;
  }

  async initFromId(id) {
    return this.#provider.get(`${ENDPOINT_CUSTOMER}?id=${id}`, this.userConfig)
      .then((res) => {
        const customer = res.data.data[0];
        this.companyId = customer.company_id;
        this.id = customer.id;
        this.name = customer.name;
        this.address = customer.address;
        this.email = customer.email;
        this.phone = customer.phone;
        return true;
      }).catch((e) => {
        console.log(e.response);
        return false;
      });
  }

  initFromData(data) {
    this.companyId = data.company_id;
    this.id = data.id;
    this.name = data.name;
    this.address = data.address;
    this.email = data.email;
    this.phone = data.phone;
  }

  async create(data) {
    return this.#provider.post(ENDPOINT_CUSTOMER, data, this.userConfig).then((r) => {
      return r.data.message === 'New customer created';
    }).catch((e) => {
      console.log(e.response);
      return false;
    });
  }

  async delete() {
    return this.#provider.delete(`${ENDPOINT_CUSTOMER}?id=${this.id}`, this.userConfig).then((r) => {
      return r.data.message === 'Customer deleted';
    }).catch((e) => {
      console.log(e.response);
      return false;
    });
  }

  async update(data) {
    return this.#provider.put(`${ENDPOINT_CUSTOMER}?id=${this.id}`, data, this.userConfig).then((r) => {
      return r.data.message === 'Customer updated';
    }).catch((e) => {
      console.log(e.response);
      return false;
    });
  }

}

export default Customer;
