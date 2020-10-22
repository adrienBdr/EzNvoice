const utils = require('../utils');

module.exports = {
  authenticate: function (req, res, next) {
    utils.decryptToken(req, (err, user) => {
      if (err) {
        return res.status(401).json(err);
      } else {
        req.user = user;
        next();
      }
    })
  }
};
