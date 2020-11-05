import ApiProvider from '../api/apiProvider';
import {
  ENDPOINT_COMPANY,
  ENDPOINT_CUSTOMER_LIST,
  ENDPOINT_INVOICE_LIST_COMPANY,
  ENDPOINT_PRODUCT_LIST
} from '../api/endpoints';
import Customer from './customer';
import Product from './product';
import Invoice from './invoice';

class Company {
  #provider = new ApiProvider();

  userConfig;

  id;

  name;

  image;

  address;

  email;

  phone;

  constructor(userConfig) {
    this.userConfig = userConfig;
  }

  async initFromId(id) {
    return this.#provider.get(`${ENDPOINT_COMPANY}?id=${id}`, this.userConfig)
      .then((r) => {
        const company = r.data.data[0];
        this.id = company.id;
        this.name = company.name;
        this.image = company.image;
        this.address = company.address;
        this.email = company.email;
        this.phone = company.phone;
        return true;
      }).catch((e) => {
        console.log(e.response);
        return false;
      });
  }

  initFromData(data) {
    this.id = data.id;
    this.name = data.name;
    this.image = data.image;
    this.address = data.address;
    this.email = data.email;
    this.phone = data.phone;
  }

  async create(data) {
    return this.#provider.post(ENDPOINT_COMPANY, data, this.userConfig).then((r) => {
      return r.data.message === 'New company created';
    }).catch((e) => {
      console.log(e.response);
      return false;
    });
  }

  async delete() {
    return this.#provider.delete(`${ENDPOINT_COMPANY}?id=${this.id}`, this.userConfig).then((r) => {
      return r.data.message === 'Company deleted';
    }).catch((e) => {
      console.log(e.response);
      return false;
    });
  }

  async update(data) {
    return this.#provider.put(`${ENDPOINT_COMPANY}?id=${this.id}`, data, this.userConfig).then((r) => {
      return r.data.message === 'Company updated';
    }).catch((e) => {
      console.log(e.response);
      return false;
    });
  }

  async listCustomers(limit, offset) {
    return this.#provider.get(`${ENDPOINT_CUSTOMER_LIST}?limit=${limit}&offset=${offset}&id=${this.id}`, this.userConfig)
      .then((r) => {
        const customers = [];

        r.data.data.forEach((customer) => {
          const customerObj = new Customer(this.userConfig);
          customerObj.initFromData(customer);
          customers.push(customers);
        });
        return customers;
      }).catch((e) => {
        console.log(e.response);
        return null;
      });
  }

  async listProducts(limit, offset) {
    return this.#provider.get(`${ENDPOINT_PRODUCT_LIST
    }?limit=${limit}&offset=${offset}&id=${this.id}`, this.userConfig)
      .then((r) => {
        const products = [];

        r.data.data.forEach((product) => {
          const productObj = new Product(this.userConfig);
          productObj.initFromData(product);
          products.push(productObj);
        });
        return products;
      }).catch((e) => {
        console.log(e.response);
        return null;
      });
  }

  async listInvoices(limit, offset) {
    return this.#provider.get(`${ENDPOINT_INVOICE_LIST_COMPANY
    }?limit=${limit}&offset=${offset}&id=${this.id}`, this.userConfig)
      .then((r) => {
        const invoices = [];

        r.data.data.forEach((invoice) => {
          const invoiceObj = new Invoice(this.userConfig);
          invoiceObj.initFromData(invoice);
          invoices.push(invoiceObj);
        });
        return invoices;
      }).catch((e) => {
        console.log(e.response);
        return null;
      });
  }
}

export default Company;
