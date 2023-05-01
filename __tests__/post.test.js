const lambdaTester = require('lambda-tester');

const { closeConnection, dropCollection } = require('../db');

const createOriginalPostL = require('../handlers/posts/original');

const postDTO = {
  user: '',
  text: 'alea jacta est',
};

describe('Robot Basics', () => {
  beforeAll((done) => {
    process.env.DB_NAME = 'strider-test';
    done();
  });

  test('Create Original Post', async () => lambdaTester(createOriginalPostL)
    .event({
      body: JSON.stringify({ ...postDTO }),
    })
    .expectResult((r) => {
      console.log('r', r);
      expect(r).toHaveProperty('statusCode', 200);
    }));

  afterAll(async () => {
    await dropCollection('robots');
    closeConnection();
  });
});
