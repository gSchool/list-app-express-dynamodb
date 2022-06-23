const AWS = require('aws-sdk');
AWS.config.update({
  region: process.env.AWS_DEFAULT_REGION
});

// You'll need to call dynamoClient methods to invoke CRUD operations on the DynamoDB table
const dynamoClient = new AWS.DynamoDB.DocumentClient();

/* 
  When launching the server for the first time, our DynamoDB
  is empty. We'll put an empty record in it to as a way to
  "define our schema"
*/

const { initialize } = require('./initialize');
initialize(dynamoClient);

module.exports = dynamoClient;