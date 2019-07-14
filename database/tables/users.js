const client = require('../config.js');

const createUser = function (github_id, name) {
  //ON CONFLICT DO NOTHING
  return new Promise((resolve, reject) => {
    let query = `INSERT INTO users (name, github_id)
                 VALUES ('${name}', '${github_id}')
                 ON CONFLICT DO NOTHING;`;
    client.query(query, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    }) 
  })
}

const findOrCreate = function (github_id, name) {
  const query = `select * from users WHERE github_id='${github_id}'`;
  return new Promise((resolve, reject) => {
    client.query(query, (err, res) => {
      if (err) {
        console.error('Encountered error: ', err);
        reject(err);
      } else {
        if(res.rows.length) {
          resolve(res);
        } else {
          createUser(github_id, name)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err);
          })
        }
      }
    })
  });
}

module.exports = {
  createUser,
  findOrCreate
}