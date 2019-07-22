const { Client } = require('pg');
const client = new Client({
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT
});

client.connect()
  .then((success) => {
    console.log('-Database Connected.');
  })
  .catch((err) => {
    console.error('Error connecting to the database: ', err);
  });

module.exports = client;