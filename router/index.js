const express = require("express");
const router = express.Router();
const ListAppService = require('../service');

const service = new ListAppService();

let title = "List Title (click me to change!)";
const items = [];

router.get("/health", (req, res) => {
  res.status(200).send("healthy");
});

router.get("/title", (req, res) => {
  service.getTitle().then(response => {
    console.log("GOT /title: " + response);
    res.status(200).send(response);
  })
  .catch(err => {
    res.status(500).send(err);
  })
});

router.post("/title", (req, res) => {
  const { title } = req.body;
  service.changeTitle(title).then(titleData => {
    console.log("POSTED /title: " + titleData);
    res.status(201).json({ title: titleData });
  });
});

router.get("/list", (req, res) => {
  service.getList().then(listData => {
    console.log("GOT '/list'" + JSON.stringify(listData));
    res.status(200).send({ items: listData });
  })
  .catch(err => {
    res.status(500).send(err);
  })
});

router.post("/item", (req, res) => {
  service.addToList(req.body.item).then(listData => {
    console.log("POSTED '/item' body: " + JSON.stringify(listData));
    res.status(200).send(listData);
  })
  .catch(err => {
    res.status(500).send(err);
  })
});

router.patch("/item", (req, res) => {
  service.updateItem(req.body.index, req.body.name).then(listData => {
    console.log("UPDATED '/item' body: " + JSON.stringify(listData));
    res.status(200).send(listData);
  })
  .catch(err => {
    res.status(500).send(err);
  })
});

router.delete("/item", (req, res) => {
  service.deleteItem(req.body.index).then(listData => {
    console.log("DELETED '/item' body: " + JSON.stringify(listData));
    res.status(200).send(listData);
  })
  .catch(err => {
    res.status(500).send(err);
  })
});

module.exports = router;
