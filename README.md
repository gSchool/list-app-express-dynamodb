# list-app-express-dynamodb

## Overview
This Express application provides a backend for [list-app-react](https://github.com/gSchool/list-app-react). It is set up to persist data in a DynamoDB table.

## Setup
1. After cloning, run `npm install` to install dependencies.

    *It is recommended that the AWS service object (found in db/index.js) is not configured with environment variables (.env) in the case that the application is deployed to EC2. We do not want to load the EC2 instance with credentials in environment variables there or configured in its aws cli. **In that case, an instance profile authorized to connect to DynamoDB is recommended when deployed to EC2.***

    *To authenticate, [load credentials into this application from a shared credentials file](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-node-credentials-shared.html). If you have configured your AWS cli locally already, the application will use your default credentials profile.*

1. Rename the **example.env** file to **.env** to use the values present there. Change them as necessary.

1. Create your DynamoDB table. You have the option to modify this repo to create the table or to do it manually. The latter will keep things simpler:
    - Create a new table and name it "list-app"
    - Set the partition key to "id" with type "Number"
    - This app's data model is quite simple and won't need a sort key
    - Leave the rest default and **Create Table**

1. To view the tables items, *Explore items* in the left hand panel of the dashboard.

## Objective
Like the [in-memory implentation of list-express](https://github.com/gSchool/list-app-express), this application makes use of the Express Router which in turn employs the use of a service layer that is responsible for persisting data. 

A DynamoDB Document Client is set up for use in the db directory and it is your objective to utilize the [Jest test suite](https://jestjs.io/docs/getting-started) to fill in the service methods handling the database operations. 

Run the test suite with **npm test**. 

It is set up to watch for changes in your repository so you can run it once and leave it to wait for you to save changes to your service logic.

Suggested resources:
- [AWS SDK for Javascript Amazon DynamoDB Examples](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/dynamodb-examples.html)
- [Getting Started with DynamoDB and AWS SDKs](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.html)
- [AWS.DynamoDB.DocumentClient reference guide](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#put-property)
- [Using Async/Await with AWS SDK](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/using-async-await.html) - the SDK allows usage of callbacks and promises however, using promises and async/await will help keep your code clean and readable. 

## Deployment
Once your service layer is complete, test the application with **npm start** and with list-app-react locally. If all your tests had passed, the whole app should function properly without further changes.

Deploy this application to an EC2 instance and hook it up to your list-app stack which will now consist of two EC2 instances and a DynamoDB table:
  - list-app-react - the frontend ui
  - list-app-express-dynamodb - the backend api
  - the DynamoDB table: list-app

Push your repository to a *public* repo (you may use your personal repository) so that you can simply clone the project into your EC2 instance. Optionally, employ the use of user data scripts to prevent mistakes manually issuing commands into your instance.

You will have to allow your backend instance to connect to DynamoDB. Do not configure the aws cli on this instance or attempt to copy any credentials over - this is an anti-pattern and would become an issue should your instance ever be compromised with credentials present.

[Attach or replace an instance profile on an Amazon EC2 instance](https://aws.amazon.com/premiumsupport/knowledge-center/attach-replace-ec2-instance-profile/)

Submit your repository link back in Learn.