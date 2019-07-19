const client = require('../config.js');

const createRepo = function(user_id, organization, repo) {
  return new Promise((resolve, reject) => {
    let query = `INSERT INTO repos (user_id, organization, repo)
                 VALUES ('${user_id}', '${organization}', '${repo}');`;
    client.query(query, (err, res) => {
      if (err) {
        reject(err);
      } else {
        console.log('Added new repo!');
        resolve(res);
      }
    })
  })
}

const getRepos = function(user_id) {
  return new Promise((resolve, reject) => {
    let query = `SELECT * FROM repos INNER JOIN users
                 ON repos.user_id=users.id WHERE repos.user_id=${user_id};`;
    client.query(query, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    })
  })
}

const deleteRepo = function(user_id, organization, repo) {
  return new Promise((resolve, reject) => {
    let query = `DELETE FROM repos WHERE user_id=${user_id}
                 AND organization='${organization}'
                 AND repo='${repo}';`
    client.query(query, (err, res) => {
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