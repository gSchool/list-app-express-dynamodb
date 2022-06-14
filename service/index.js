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
      const listData  = await this.getListData();
      const params = this.generateParams();
      params.Item = {
        id: appId,
        title,
        items: [...listData.items],
      };
      await dynamoClient.put(params).promise();
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
      const listData = await this.getListData();

      listData.items.push(item);

      const params = this.generateParams();
      params.Item = listData;
      await dynamoClient.put(params).promise();

      return await this.getList();
    } catch (error) {
      return error;
    }
  }

  async updateItem(index, name) {
    try {
      const listData = await this.getListData();

      listData.items[index].name = name;

      const params = this.generateParams();
      params.Item = listData;
      await dynamoClient.put(params).promise();
      
      return await this.getList();
    } catch (error) {
      return error;
    }
  }

  async deleteItem(index) {
    try {
      const listData = await this.getListData();

      listData.items.splice(index, 1);

      const params = this.generateParams();
      params.Item = listData;
      await dynamoClient.put(params).promise();
      
      return await this.getList();
    } catch (error) {
      return error;
    }
  }
};
