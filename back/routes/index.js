const auth = require("./auth.route");
const user = require("./user.route");
const company = require('./company.route');
const customer = require('./customer.route')

const routers = [
  {name: '/auth', router: auth},
  {name: '/user', router: user},
  {name: '/company', router: company},
  {name: '/customer', router: customer}
]

module.exports = routers;