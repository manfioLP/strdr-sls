const { closeConnection, connectToDatabase } = require('../db');

const connectHandler = async () => {
  try {
    await connectToDatabase();
    return true;
  } catch (e) {
    console.error('error on connect', e);
    return false;
  }
};

describe('DB', () => {
  test('Connect', async () => {
    const result = await connectHandler();

    expect(result).toBeTruthy();
  });

  afterAll(async () => {
    closeConnection();
  });
});
