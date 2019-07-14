const express = require('express')
const app = express()
const port = 3000;
const GitHubStrategy = require('passport-github').Strategy;
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const { Users, Sessions } = require('../database');

//configure env variables
require('dotenv').config();

//configure Github Authentication Strategy

passport.serializeUser((user, done) => {
  done(null, user);
})
passport.deserializeUser((user, done) => {
  done(null, user);
})
passport.use(new GitHubStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/login/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    const { id, username } = profile;
    Users.findOrCreate(id, username)
    .then((results) => {
      console.log('Profile created for: ', username);
      return Sessions.createSession(id, accessToken);
    })
    .catch((err) => {
      console.error('Error in findOrCreate User: ', err);
      cb(err);
    })
    .then((result) => {
      console.log('Session recorded');
    })
    .catch((err) => {
      console.error('Error in loggin User session: ', err);
    })
    return cb(null , {profile, accessToken});
  }
))

app.use(express.static('dist'));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(cookieParser());
//the keys argument can be any number, but it needs to be secret. 
app.use(cookieSession({
  name: 'session',
  keys: [process.env.COOKIE_SESSION]
}))

app.get('/login', passport.authenticate('github'));

app.get('/login/callback', passport.authenticate('github', { failureRedirect: '/'}), (req, res) => {
  req.session.token = req.user.accessToken;

  res.redirect('/');
});

app.listen(port, () => console.log(`-Server Boot Successful. Running on port ${port}.`));