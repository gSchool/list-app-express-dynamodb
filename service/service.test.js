require("dotenv").config();
const ListAppService = require("../service");
const service = new ListAppService();
const dynamoClient = require("../db");
const { dropTable, initialize } = require("../db/initialize");

describe("List Service Tests", () => {
  beforeAll(async () => {
    // await dropTable(dynamoClient);
    // await initialize(dynamoClient);
  });

  beforeEach(async () => {
    await dropTable(dynamoClient);
    await initialize(dynamoClient);
    // await dynamoClient.put({
    //   TableName: process.env.TABLE_NAME,
    //   Item: {
    //     id: process.env.APP_ID,
    //     items: [],
    //     title: "List Title (click me to change!)",
    //   }
    // })
  });

  it("should runs tests", () => {
    expect(1).toEqual(1);
  });

  it("should get all list app data", async () => {
    const actual = await service.getListData();

    expect(actual).toEqual({
      id: 0,
      items: [],
      title: "List Title (click me to change!)",
    });
  });

  it("should get the app title", async () => {
    const actual = await service.getTitle();

    expect(actual).toEqual("List Title (click me to change!)");
  });

  it("should change the app title, returning the updated title", async () => {
    const actual = await service.changeTitle("New Title");

    expect(actual).toEqual("New Title");
  });

  it("should add an item to the list", async () => {
    const item = {
      name: "an item description",
    };
    const actual = await service.addToList(item);

    expect(actual).toEqual([
      {
        name: "an item description",
      },
    ]);
  });

  it("should update an item's name using list index", async () => {
    const item = {
      name: "an item description",
    };
    const item2 = {
      name: "a 2nd item description",
    };
    const item3 = {
      name: "a 3rd item description",
    };
    await service.addToList(item);
    await service.addToList(item2);
    await service.addToList(item3);

    await service.updateItem(1, "an updated description");
    const actual = await service.getList();

    expect(actual).toEqual([
      {
        name: "an item description",
      },
      {
        name: "an updated description",
      },
      {
        name: "a 3rd item description"
      }
    ])
  });

  it("should delete an item using list index", async () => {
    const item = {
      name: "an item description",
    };
    const item2 = {
      name: "a 2nd item description",
    };
    await service.addToList(item);
    await service.addToList(item2);

    await service.deleteItem(0);
    const actual = await service.getList();

    expect(actual).toEqual([
      {
        name: "a 2nd item description",
      }
    ])
  });
});
