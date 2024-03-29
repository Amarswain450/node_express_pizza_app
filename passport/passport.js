const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcryptjs');

function init(passport){
    passport.use(new LocalStrategy({usernameField: 'email'}, async (email, password, done) => {
        const user = await User.findOne({email: email});
        if(!user){
            return done(null, flase, {message: 'Email is not exists'});
        }

        bcrypt.compare(password, user.password).then((match) => {
            if(match){
                return done(null, user, {message: "Logged in successfully"});
            }else{
                return done(null, false, {message: "Invalid email or password"});
            }
        }).catch((err) => {
            return done(null, false, {message: "something went wrong"});
        });

    }));

    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
    });
}

module.exports = init;