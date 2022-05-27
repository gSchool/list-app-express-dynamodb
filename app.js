const express = require("express");
const cors = require('cors');
const router = require('./router');

module.exports = function App() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use(router);

  return app;
};

//------------------------------------------------------//
/* 
    When launching the server for the first time, our DynamoDB
    is empty. We'll put an empty record in it to as a way to
    "define our schema"
*/
const TableName = process.env.TABLE_NAME;
const appId = parseInt(process.env.APP_ID);
const dynamoClient = require('./db');

const populateTableWithPlaceholder = async () => {
  const params = {
    TableName
  }
  await dynamoClient.scan(params).promise()
    .then((data) => {
      if (data.Items.length === 0) {
        params.Item = { 
          id: appId,
          title: "List Title (click me to change!)", 
          items: [] 
        };
        return dynamoClient.put(params).promise();
      }
    })
    .catch((error) => {
      console.error("Error connecting to DynamoDB " + error)
    });
}
populateTableWithPlaceholder();
//------------------------------------------------------//