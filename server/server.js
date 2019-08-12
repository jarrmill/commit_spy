const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const morgan = require('morgan');
const axios = require('axios');
const passport = require('passport');

//configure env variables
require('dotenv').config();
require('./passport.js');

const port = process.env.SERVERPORT || 443;
const { Users, Sessions, Repos } = require('../database');


app.use(express.static('dist'));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(cookieParser());
app.use(morgan('dev'))

//the keys argument for cookieSession can be any number, but it needs to be secret. 
app.use(cookieSession({
  name: 'session',
  keys: [process.env.COOKIE_SESSION]
}))


//--------------------------------------------
// AUTH ENDPOINTS
//--------------------------------------------

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

//---------------------------------------------
// API ENDPOINTS
//---------------------------------------------

app.get('/users/repos', function(req, res) {
  if (!req.session.token) {
    res.json({username: undefined, repos: undefined});
  }
  else {
    Sessions.getSession(req.session.token)
    .then((user) => {
      const username = user.rows[0].name;
      const id = user.rows[0].id;
      return Repos.getRepos(id, username);
    })
    .then((results) => {
      const { username }  = results;
      const repos = results.rows;
      if (!repos.length) {
        return res.send({username, repos: []});
      }
      const headers = { headers: { "Authorization": `token ${req.session.token}`}}

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
  
  if (!req.session.token) {
    res.status(201);
    res.send();
  }
  else {
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
  }
});

app.post('/users/repos/demo', function(req, res) {
  const { organization, repository } = req.body;
  const query = `https://api.github.com/repos/${organization}/${repository}/commits?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`;  

  axios.get(query)
    .then((results) => {
      res.status(201);
      res.json(results.data);
      
    })
    .catch((err) => {
      console.error(err);
      res.send();
    })
});

app.delete('/user/repos', (req, res) => {
  const { organization, repository } = req.body;
  if (!req.session.token) {
    res.sendStatus(200);
  }
 else {
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
  }
})

app.listen(port, () => console.log(`-Server Boot Successful. Running on port ${port}`));