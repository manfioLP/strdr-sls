const path = require('path');

console.log('NODE_ENV', process.env.NODE_ENV);
const env = process.env.NODE_ENV === 'integration' ? '.env.integration' : '.env.test';
require('dotenv').config({ path: path.resolve(`config/${env}`) });

console.log(`!=== ${env} loaded ===!`);
