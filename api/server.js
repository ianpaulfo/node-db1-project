const express = require("express");

const db = require("../data/dbConfig.js");
const accountRouter = require("../accounts/accountsRouter");

const server = express();

server.use(express.json());
server.use("/api/accounts", accountRouter);

server.get("/", (req, res) => {
  return res.send("<h2>This is in the server.</h2>");
});

module.exports = server;
