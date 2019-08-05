const client = require('../config.js');

const createRepo = function(user_id, organization, repo) {
  return new Promise((resolve, reject) => {
    let query = `INSERT INTO repos (user_id, organization, repo)
                 VALUES ($1, $2, $3);`;
    let values = [user_id, organization, repo];
    client.query(query, values, (err, res) => {
      if (err) {
        reject(err);
      } else {
        console.log('Added new repo!');
        resolve(res);
      }
    })
  })
}

const getRepos = function(user_id, username) {
  return new Promise((resolve, reject) => {
    let query = `SELECT * FROM repos INNER JOIN users
                 ON repos.user_id=users.id WHERE repos.user_id=$1;`;
    let values = [user_id];
    client.query(query, values, (err, res) => {
      if (err) {
        reject(err);
      } else {
        res.username = username;
        resolve(res);
      }
    })
  })
}

const deleteRepo = function(user_id, organization, repo) {
  return new Promise((resolve, reject) => {
    let query = `DELETE FROM repos WHERE user_id=$1
                 AND organization=$2
                 AND repo=$3;`
    let values = [user_id, organization, repo];
    client.query(query, values, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  })
}

module.exports = {
  createRepo,
  getRepos,
  deleteRepo,
}