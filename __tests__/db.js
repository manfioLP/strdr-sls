const { promisify } = require('util');
const { connectToDatabase } = require('../db');

const handler = promisify(connectToDatabase);

jest.setTimeout(20000);

describe('DB', () => {
  test.only('Connect', async (done) => {
    const result = await handler();
    console.log('result: ', result);

    // await closeConnection();
    // done();
  });
});
