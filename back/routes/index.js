const auth = require("./auth.route");
const user = require("./user.route");
const company = require('./company.route');
const customer = require('./customer.route');
const product = require('./product.route');
const currency = require('./currency.route');
const invoice = require('./invoice.route');

const routers = [
  {name: '/auth', router: auth},
  {name: '/user', router: user},
  {name: '/company', router: company},
  {name: '/customer', router: customer},
  {name: '/product', router: product},
  {name: '/currency', router: currency},
  {name: '/invoice', router: invoice}
]

module.exports = routers;