console.log('AFTER ENV');
console.log('process.env.timeout', process.env.TEST_TIMEOUT);

jest.setTimeout(process.env.TEST_TIMEOUT || 6000);
