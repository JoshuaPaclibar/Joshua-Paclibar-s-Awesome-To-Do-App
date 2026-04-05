const { getConnectedClient } = require("../database");

const getCollection = () => {
  const client = getConnectedClient();
  if (!client) {
    throw new Error("Database client not connected.");
  }
  return client.db("todosdb").collection("todos");
};

module.exports = { getCollection };