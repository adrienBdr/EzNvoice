const user = require("./user.route")

const routers = [
  {name: '/user', router: user}
]

module.exports = routers;