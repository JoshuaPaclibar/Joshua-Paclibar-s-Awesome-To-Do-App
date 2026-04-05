const express = require("express");
const router = express.Router();
const { getCollection } = require("./models/index");
const { ObjectId } = require("mongodb");

// GET
router.get("/todos", async (req, res) => {
  const collection = getCollection();
  const todos = await collection.find({}).toArray();
  res.json(todos);
});

// POST
router.post("/todos", async (req, res) => {
  try {
    const collection = getCollection();
    const { todo } = req.body;

    const result = await collection.insertOne({
      todo,
      status: false,
    });

    res.status(201).json({
      _id: result.insertedId,
      todo,
      status: false,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// DELETE todo
router.delete("/todos/:id", async (req, res) => {
  try {
    const collection = getCollection();
    const _id = new ObjectId(req.params.id);

    const result = await collection.deleteOne({ _id });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// put todo
router.put("/todos/:id", async (req, res) => {
  try {
    const collection = getCollection();
    const _id = new ObjectId(req.params.id);
    const { status } = req.body;

    const result = await collection.updateOne(
      { _id },
      { $set: { status: !status } }
    );

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;