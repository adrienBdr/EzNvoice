const auth = require("./auth.route");
const user = require("./user.route");
const company = require('./company.route');

const routers = [
  {name: '/auth', router: auth},
  {name: '/user', router: user},
  {name: '/company', router: company}
]

module.exports = routers;