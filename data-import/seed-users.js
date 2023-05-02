const path = require('path');
const { Seeder } = require('mongo-seeding');

require('dotenv').config({ path: path.resolve('.env.test') });

const run = async (dbName = process.env.DB_NAME, user = process.env.SEEDER_USERNAME, pwd = process.env.SEEDER_PWD) => {
  console.log('seeding...', dbName);
  const config = {
    database: {
      host: process.env.DB_HOST,
      port: 27017,
      name: dbName,
      username: user,
      password: pwd,
    },
    dropDatabase: true,
  };
  const seeder = new Seeder(config);

  const collections = seeder.readCollectionsFromPath(
    path.resolve('./data-import'),
    {
      transformers: [Seeder.Transformers.replaceDocumentIdWithUnderscoreId],
    },
  );

  try {
    await seeder.import(collections);
    console.log('MONGO DB successfully Seed!');
  } catch (err) {
    console.error('Failed to seed DB, please check .env vars or try to run the seeder from CLI, ERR:', err);
    console.log("HINT: seed -u 'mongodb://127.0.0.1:27017/strider' --drop-database ./data-import");
  }
};
module.exports = run;

run();
