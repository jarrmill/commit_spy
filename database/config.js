const { Client } = require('pg');
const client = new Client({
  user: 'jarrodmiller',
  database: 'commitspy',
  password: ''
});

client.connect()
  .then((success) => {
    console.log('-Database Connected.');
  })
  .catch((err) => {
    console.error('Error connecting to the database: ', err);
  });

module.exports = client;