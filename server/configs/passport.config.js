const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User          = require('../models/User');
const bcrypt        = require('bcrypt');

passport.serializeUser((user, next) => {
  next(null, user.id);
});

passport.deserializeUser((id, next) => {
  User.findById(id)
    .then(user => next(null, user))
    .catch(next)
});

passport.use(new LocalStrategy((username, password, next) => {
  User.findOne({ username }, (err, foundUser) => {
      if (err) {
          next(err);
          return;
      }

      if (!foundUser) {
          next(null, false, { message: 'Usuario no registrado.' });
          return;
      }

      if (!bcrypt.compareSync(password, foundUser.password)) {
          next(null, false, { message: 'Contraseña incorrecta.' });
          return;
      }

      next(null, foundUser);
  });
}));

module.exports = (app)  => {
  app.use(passport.initialize());
  app.use(passport.session());
}
