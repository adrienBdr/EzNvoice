const user = require("./user.route");
const auth = require("./auth.route");

const routers = [
  {name: '/auth', router: auth},
  {name: '/user', router: user}
]

module.exports = routers;