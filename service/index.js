const TableName = process.env.TABLE_NAME;
const appId = parseInt(process.env.APP_ID);
// You'll need to call dynamoClient methods to envoke CRUD operations on the DynamoDB table
const dynamoClient = require("../db");

// The apps routes will uses these service methods to interact with our DynamoDB Table
module.exports = class ListAppService {
  generateParams = () => {
    return {
      TableName,
      Key: { id: appId },
    };
  };
  
  async getListData() {
    try {
      const listData = await dynamoClient
        .get(this.generateParams())
        .promise();
      return listData.Item;
    } catch (error) {
      return error;
    }
  }

  async getTitle() {
    try {
      const listData = await this.getListData();
      return listData.title;
    } catch (error) {
      return error;
    }
  }

  async changeTitle(title) {
    try {
      // const listData  = await this.getListData();
      // const params = this.generateParams();
      // params.Item = {
      //   id: appId,
      //   title,
      //   items: [...listData.items],
      // };
      // await dynamoClient.put(params).promise();
      // return await this.getTitle();

      const params = this.generateParams();
      params.UpdateExpression = 'set #oldTitle = :newTitle';
      params.ExpressionAttributeNames = { "#oldTitle" : "title" };
      params.ExpressionAttributeValues = { ":newTitle" : title };

      await dynamoClient.update(params).promise();

      return await this.getTitle();
    } catch (error) {
      return error;
    }
  }

  async getList() {
    try {
      const listData = await this.getListData();
      return listData.items;
    } catch (error) {
      return error;
    }
  }

  async addToList(item) {
    try {
      // const listData = await this.getListData();

      // listData.items.push(item);

      // const params = this.generateParams();
      // params.Item = listData;
      // await dynamoClient.put(params).promise();

      // return await this.getList();

      // example showing list_append operation: 
      // https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_UpdateItem.html#API_UpdateItem_RequestSyntax

      const params = this.generateParams();
      params.UpdateExpression = 'set #oldItems = list_append(#oldItems,:newItem)';
      params.ExpressionAttributeNames = { "#oldItems" : "items" };
      // params.ExpressionAttributeValues = { ":newItem" : item }; type:M error
      params.ExpressionAttributeValues = { ":newItem" : [ item ] };

      await dynamoClient.update(params).promise();

      return await this.getList();
    } catch (error) {
      return error;
    }
  }

  async updateItem(index, name) {
    try {
      // const listData = await this.getListData();

      // listData.items[index].name = name;

      // const params = this.generateParams();
      // params.Item = listData;
      // await dynamoClient.put(params).promise();
      
      // return await this.getList();

      // example using setting array element at index: 
      // https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.UpdateExpressions.html

      const params = this.generateParams();
      params.UpdateExpression = `set #oldItems[${index}] = :newItem`;
      params.ExpressionAttributeNames = { "#oldItems" : "items" };
      params.ExpressionAttributeValues = { ":newItem" : { name } };
      console.log("Updated Params: " + JSON.stringify(params, null, 2));

      await dynamoClient.update(params).promise();
      // return await this.getListData();
      const response = await this.getListData();
      console.log(response);
      return response;

    } catch (error) {
      return error;
    }
  }

  async deleteItem(index) {
    try {
      // const listData = await this.getListData();

      // listData.items.splice(index, 1);

      // const params = this.generateParams();
      // params.Item = listData;
      // await dynamoClient.put(params).promise();
      
      // return await this.getList();

      const params = this.generateParams();
      params.UpdateExpression = `REMOVE #items[${index}]`;
      // DELETE doesn't work because you have to provide the attribute value
      params.ExpressionAttributeNames = { "#items" : "items" };
      console.log("Updated Params: " + JSON.stringify(params, null, 2));
      // params.ExpressionAttributeValues = { ":newItem" : { name } };

      await dynamoClient.update(params).promise();
      // return await this.getListData();
      const response = await this.getListData();
      console.log("After Delete: " + JSON.stringify(response, null, 2));
      return response;

    } catch (error) {
      return error;
    }
  }
};
