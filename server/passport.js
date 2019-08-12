const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const { Users, Sessions, Repos } = require('../database');
require('dotenv').config();

passport.serializeUser((user, done) => {
  done(null, user);
})
passport.deserializeUser((user, done) => {
  done(null, user);
})
passport.use(new GitHubStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: `${process.env.CLIENT_CALLBACK}/login/callback`
  },
  function(accessToken, refreshToken, profile, cb) {
    const { id, username } = profile;
    Users.findOrCreate(id, username)
    .then((results) => {
      return Sessions.createSession(id, accessToken);
    })
    .catch((err) => {
      console.error('Error in findOrCreate User: ', err);
      cb(err);
    })
    .catch((err) => {
      console.error('Error in loggin User session: ', err);
    })
    return cb(null , {profile, accessToken});
  }
))