const { closeConnection, dropCollection } = require('../db');
const seedUsers = require('../data-import/seed-users');

const { create: createOriginalPostL } = require('../handlers/posts/original');

const context = {
  awsRequestId: 'ckb8j7s4q0002qjr9azyw2xmv',
  callbackWaitsForEmptyEventLoop: false,
  clientContext: null,
  functionName: 'robot-delivery-dev-addRobot',
  functionVersion: '$LATEST',
};

const users = require('../data-import/users');

const postDTO = (user, text = 'alea jacta est') => ({ user, text });

const expectPostProperties = (p) => {
  expect(p).toHaveProperty('user');
  expect(p).toHaveProperty('type');
  expect(p).toHaveProperty('text');
  expect(p).toHaveProperty('_id');
};

describe('Post Basics', () => {
  beforeAll(async () => {
    await seedUsers('strider-test', process.env.MONGO_USERNAME, process.env.MONGO_PWD);
  });

  test('Create Original Post for User0', async () => {
    const response = await createOriginalPostL({
      body: JSON.stringify(postDTO(users[0])),
    }, context);
    expect(response).toHaveProperty('statusCode', 200);

    const post = JSON.parse(response.body);
    expectPostProperties(post);
    expect(post).toHaveProperty('user', users[0]._id.toString());
    expect(post).toHaveProperty('text');
  });

  afterAll(async () => {
    await dropCollection('posts');
    closeConnection();
  });
});
