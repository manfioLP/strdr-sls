const path = require('path');

console.log('NODE_ENV', process.env.NODE_ENV);
require('dotenv').config({ path: path.resolve('.env.test') });

console.log('!=== env.test loaded ===!');
