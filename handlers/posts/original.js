const { connectToDatabase } = require('../../db');
const { Post } = require('../../db/models');

module.exports.create = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await connectToDatabase();

    const post = await Post.create({
      ...JSON.parse(event.body),
    });

    return {
      statusCode: 200,
      body: JSON.stringify(post),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
    };
  } catch (err) {
    const msg = 'Could not create the post.';
    return {
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({ msg, err }),
    };
  }
};
