const path = require('path');
const mongoose = require('mongoose');

let isConnected;

require('dotenv').config({ path: path.resolve('.env') });

const connectionString = `mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PWD}@cluster0.dnqzeis.mongodb.net/?retryWrites=true&w=majority`;

const connectToDatabase = () => {
  if (isConnected) {
    console.log('... using existing database connection');
    return Promise.resolve();
  }

  console.log('... using new database connection');
  return mongoose.connect(connectionString)
    .then((db) => {
      isConnected = db.connections[0].readyState;
    });
};

const closeConnection = () => {
  isConnected = false;
  return mongoose.disconnect();
};

// for tests purposes only
const dropCollection = async (collectionName) => {
  if (!isConnected) {
    console.error('DB Disconnected, first connect to DB to drop a collection');
    return { dropped: false, msg: 'DB Disconnected, first connect to DB to drop a collection' };
  }
  if (process.env.NODE_ENV === 'PRODUCTION') {
    console.error('Cant drop a PRODUCTION DB');
    return { dropped: false, msg: 'Cannot drop a PRODUCTION DB' };
  }

  const drop = await mongoose.connection.db.dropCollection(collectionName);
  return {
    drop, msg: `Collection ${collectionName} dropped!`,
  };
};

module.exports = {
  connectToDatabase,
  closeConnection,
  dropCollection,
};
