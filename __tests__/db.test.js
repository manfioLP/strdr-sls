const { closeConnection, connectToDatabase } = require('../db');

const connectHandler = async () => {
  try {
    await connectToDatabase();
    return true;
  } catch (e) {
    return false;
  }
};

jest.setTimeout(15000);

describe('DB', () => {
  test('Connect', async () => {
    const result = await connectHandler();
    console.log('result: ', result);

    expect(result).toBeTruthy();
    // await closeConnection();
  });

  afterAll(async () => {
    closeConnection();
  });
});
