const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport')
const db = require('./models');
const routes = require('./routes');
const PORT = 8081;
const HOST = '0.0.0.0';
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

routes.forEach(route => {
  app.use(route.name, route.router);
})

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  db.User.findByPk(id, null).then(user => {
    done(null, user)
  }).catch(err => {
    done(err, null)
  })
});


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
