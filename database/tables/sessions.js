const client = require('../config.js');

const createSession = function (github_id, session_token) {
  //ON CONFLICT DO NOTHING
  return new Promise((resolve, reject) => {
    let query = `INSERT INTO sessions (github_id, session)
                 VALUES ($1, $2);`;
    let values = [github_id, session_token]
    client.query(query, values, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    }) 
  })
}

const getSession = function(session_token) {
  return new Promise((resolve, reject) => {
    let query = `SELECT * FROM sessions
                 INNER JOIN users ON sessions.github_id = users.github_id
                 WHERE sessions.session=$1;`;
    let values = [session_token]
    client.query(query, values, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    }) 
  })
}

module.exports = { createSession, getSession };