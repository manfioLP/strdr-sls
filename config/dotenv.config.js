const path = require('path');

const env = process.env.NODE_ENV;
const prod = env.toLowerCase() === 'prod' || env.toLowerCase() === 'production';

const envVar = prod ? '.env' : `.env.${process.env.NODE_ENV}`;
console.log('prod', prod);
console.log('env', env);

module.exports = function ({
  dotenv,
  paths,
}) {
  const { parsed } = dotenv.config({ path: path.resolve(`config/${envVar}`) });
  return { ...parsed };
};
