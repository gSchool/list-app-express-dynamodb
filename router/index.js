const express = require("express");
const router = express.Router();

let title = "List";
const items = [];

router.get("/health", (req, res) => {
  res.status(200).send("healthy");
});

router.get("/title", (req, res) => {
  res.status(200).send(title);
});

router.post("/title", (req, res) => {
  console.log("POST '/title' body: " + JSON.stringify(req.body));
  title = req.body.title;
  res.status(201).json({ title });
});

router.get("/list", (req, res) => {
  console.log("GET '/list' body: " + JSON.stringify(items));
  res.status(200).json({ items });
});

router.post("/item", (req, res) => {
  console.log("POST '/item' body: " + JSON.stringify(req.body));
  items.push(req.body);
  res.status(201).json(items);
});

router.patch("/item", (req, res) => {
  console.log("PATCH '/item' body: " + JSON.stringify(req.body));
  items[req.body.index].name = req.body.name;
  res.status(200).json(items);
});

router.delete("/item", (req, res) => {
  console.log("DELETE '/item' body: " + JSON.stringify(req.body));
  items.splice(req.body.index, 1);
  res.status(200).json(items);
});
module.exports = router;
