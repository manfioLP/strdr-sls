const db = process.argv[2];
console.log('db', db);

const path = require('path');

if (db !== 'test' && db !== 'dev') {
  if (db === 'prod' || db === 'production') throw new Error('You shouldnt populate prod DB using script');
  throw new Error(`Your user does not have auth credentials for DB ${db}`);
} else {
  require('dotenv').config({ path: path.resolve(`config/.env.${db}`) });
}

require('./seed-users')();
