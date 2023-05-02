print('Start #################################################################');
db = db.getSiblingDB('strider');
db.createUser(
  {
    user: process.env.MONGO_USERNAME,
    pwd: process.env.MONGO_PWD,
    roles: [{ role: 'readWrite', db: process.env.DB_NAME }],
  },
);
print('Strider user created!');
db.createUser(
  {
    user: process.env.SEEDER_USERNAME,
    pwd: process.env.SEEDER_PWD,
    roles: [
      { role: 'dbAdmin', db: process.env.DB_NAME },
      { role: 'readWrite', db: process.env.DB_NAME },
    ],
  },
);
print('Seeder user created!');
db.createCollection('users');
print('################################################################# END');
