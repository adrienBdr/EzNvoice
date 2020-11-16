import ApiProvider from '../api/apiProvider';
import { ENDPOINT_INVOICE } from '../api/endpoints';
import dateFormatting from '../utils';
import Customer from './customer';
import Currency from './currency';

class Invoice {
  #provider = new ApiProvider();

  userConfig;

  id;

  date;

  dateDue;

  companyId;

  currencyId;

  customerId;

  file;

  tax;

  total;

  constructor(userConfig) {
    this.userConfig = userConfig;
  }

  async initFromId(id) {
    return this.#provider.get(`${ENDPOINT_INVOICE}?id=${id}`, this.userConfig)
      .then((res) => {
        const invoice = res.data.data[0];
        this.currencyId = invoice.company_id;
        this.currencyId = invoice.currency_id;
        this.currencyId = invoice.customer_id;
        this.date = invoice.date;
        this.dateDue = invoice.date_due;
        this.id = invoice.id;
        this.total = invoice.total;
        this.tax = invoice.tax;
        this.file = invoice.file;
        return true;
      }).catch((e) => {
        console.log(e.response);
        return false;
      });
  }

  initFromData(data) {
    this.companyId = data.company_id;
    this.currencyId = data.currency_id;
    this.customerId = data.customer_id;
    this.dateDue = dateFormatting(data.date_due);
    this.date = dateFormatting(data.date);
    this.id = data.id;
    this.total = data.total;
    this.tax = data.tax;
    this.file = data.file;
  }

  async create(data) {
    return this.#provider.post(ENDPOINT_INVOICE, data, this.userConfig).then((r) => {
      return r.data.message === 'New Invoice created';
    }).catch((e) => {
      console.log(e.response);
      return false;
    });
  }

  async delete() {
    return this.#provider.delete(`${ENDPOINT_INVOICE}?id=${this.id}`, this.userConfig).then((r) => {
      return r.data.message === 'Invoice deleted';
    }).catch((e) => {
      console.log(e.response);
      return false;
    });
  }

  async getCustomer() {
    const customer = new Customer(this.userConfig);
    await customer.initFromId(this.customerId);
    return customer;
  }

  async getCurrency() {
    const currency = new Currency(this.userConfig);
    await currency.initFromId(this.currencyId);
    return currency;
  }

}

export default Invoice;
