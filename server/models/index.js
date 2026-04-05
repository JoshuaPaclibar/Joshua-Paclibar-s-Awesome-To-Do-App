const { getConnectedClient } = require("../database");

const getCollection = () => {
  const client = getConnectedClient();
  return client.db("todosdb").collection("todos");
};

module.exports = { getCollection };