const path = require('path');
const { Seeder } = require('mongo-seeding');

require('dotenv').config({ path: path.resolve('.env.test') });

const config = {
  database: {
    host: process.env.DB_HOST,
    port: 27017,
    name: process.env.DB_NAME,
    username: process.env.SEEDER_USERNAME,
    password: process.env.SEEDER_PWD,
  },
  dropDatabase: true,
};
const seeder = new Seeder(config);

const collections = seeder.readCollectionsFromPath(
  path.resolve('./data-import/users'),
);

const run = async () => {
  try {
    await seeder.import(collections);
    console.log('MONGO DB successfully Seed!');
  } catch (err) {
    console.error('Failed to seed DB, please check .env vars or try to run the seeder from CLI, ERR:', err);
    console.log("HINT: seed -u 'mongodb://127.0.0.1:27017/strider' --drop-database ./data-import");
  }
};
run();
