const express = require('express')
const app = express()
const port = process.env.PORT || 443;
const GitHubStrategy = require('passport-github').Strategy;
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const morgan = require('morgan');
const axios = require('axios');
const test_var = process.env.TEST_VAR || 'NO ENV DETECTED';
//configure env variables
require('dotenv').config();

//connect to database - needs to be after dotenv to properly load env
const { Users, Sessions, Repos } = require('../database');

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
    callbackURL: `${process.env.CLIENT_CALLBACK}/login/callback`
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
app.use(morgan('dev'))
//the keys argument can be any number, but it needs to be secret. 
app.use(cookieSession({
  name: 'session',
  keys: [process.env.COOKIE_SESSION]
}))

app.get('/login', passport.authenticate('github'));

app.get('/logout', (req, res) => {
  req.logout();
  req.session = null;
  res.redirect('/');
})

app.get('/login/callback', passport.authenticate('github', { failureRedirect: '/'}), (req, res) => {
  req.session.token = req.user.accessToken;

  res.redirect('/');
});

app.get('/users/repos', function(req, res) {
  if (req.session.token) {
    Sessions.getSession(req.session.token)
    .then((user) => {
      //res.send(`Welcome back ${results.rows[0].name}`);
      const id = user.rows[0].id;
      return Repos.getRepos(id);
    })
    .then((results) => {
      console.log('Got results!: ', results.rows);
      const username = results.rows[0].name;
      const repos = results.rows;
      const headers = { headers: { "Authorization": `token ${req.session.token}`}}

      // axios.get(`https://api.github.com/repos/jarrmill/mvp/commits`, headers)
      //   .then((results) => {
      //     console.log('Results: ', results.data)
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   })
      let promiseArray = repos.map((repo) => {
        return axios.get(`https://api.github.com/repos/${repo.organization}/${repo.repo}/commits`, headers)
      })
      Promise.all(promiseArray)
        .then((apiResults) => {
          const commits = apiResults.map(result => result.data);
          res.json({ username, repos: commits })
        })
        .catch((apiErr) => {
          console.error('Error in GitHub API call: ', apiErr);
        })
    })
    .catch((err) => {
      console.error('Error in get repos: ', err);
      res.send();
    })
  }
})

app.post('/users/repos', function(req, res) {
  const { organization, repository } = req.body;
  const headers = { headers: { "Authorization": `token ${req.session.token}`}}
  
  if (req.session.token) {
    Sessions.getSession(req.session.token)
    .then((userResults) => {
      const user_id = userResults.rows[0].id;
      return Repos.createRepo(user_id, organization, repository);
    })
    .then(() => {
      return axios.get(`https://api.github.com/repos/${organization}/${repository}/commits`, headers)
    })
    .then((results) => {
      res.status(201);
      res.json(results.data);
      
    })
    .catch((err) => {
      console.error(err);
    })
  } else {
    res.status(401);
    res.send();
  }
});

app.delete('/user/repos', (req, res) => {
  const { organization, repository } = req.body;
  if (req.session.token) {
    Sessions.getSession(req.session.token)
    .then((results) => {
      const user_id = results.rows[0].id;
      return Repos.deleteRepo(user_id, organization, repository);
    })
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.error(err);
      res.send();
    })
  } else {
    res.sendStatus(200);
  }
})

app.listen(port, () => console.log(`-Server Boot Successful. Running on port ${port}. ENV DETECTED: ${process.env.CLIENT_ID.slice(0,5)}`));