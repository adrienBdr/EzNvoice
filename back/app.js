const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport')
const utils = require('./utils');
const User = require("./models/user");
const routes = require('./routes');
const PORT = 8080;
const HOST = '0.0.0.0';
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', async (req, res) => {
  utils.resSuccess(res, [{val: "working !"}])
});

routes.forEach(route => {
  app.use(route.name, route.router);
})

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findByPk(id, null).then(user => {
    done(null, user)
  }).catch(err => {
    done(err, null)
  })
});


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
