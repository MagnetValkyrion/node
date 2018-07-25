var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use('local.signup', new LocalStrategy( {
    usernameField: 'user',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, user, password, done) {
    if (err) {
        return done(err);
    }
    if (user) {
        return done(null, false, {message: 'Nombre de Usuario ya en uso'})
    }
    var newUser = new User();
    newUser.user = user;
    newUser.password = password;
    newUser.save(function(err, result) {
        if (err) {
            return done(err);
        }
        return done(null, newUser);
    });

}));