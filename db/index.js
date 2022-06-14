// Authenticate to AWS using our credentials, also on the Node env process
const AWS = require('aws-sdk');
AWS.config.update({
  region: process.env.AWS_DEFAULT_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

// You'll need to call dynamoClient methods to invoke CRUD operations on the DynamoDB table
const dynamoClient = new AWS.DynamoDB.DocumentClient();

/* 
  When launching the server for the first time, our DynamoDB
  is empty. We'll put an empty record in it to as a way to
  "define our schema"
*/
const initializeDB = require('./initialize');
initializeDB(dynamoClient);

module.exports = dynamoClient;