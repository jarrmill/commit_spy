const client = require('../config.js');

const addRepo = function(user_id, organization, repo) {
  return new Promise((resolve, reject) => {
    let query = `INSERT INTO repos (user_id, organization, repo)
                 VALUES ('${user_id}', '${organization}', '${repo}');`;
    client.query(query, (err, res) => {
      if (err) {
        reject(err);
      } else {
        cosnole.log('Added new repo!');
        resolve(res);
      }
    })
  })
}

module.exports = {
  addRepo
}