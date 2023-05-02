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

jest.setTimeout(12000); // sometimes depending on network Atlas connection can take ~10secs

describe('DB', () => {
  test('Connect', async () => {
    const result = await connectHandler();

    expect(result).toBeTruthy();
  });

  afterAll(async () => {
    closeConnection();
  });
});
