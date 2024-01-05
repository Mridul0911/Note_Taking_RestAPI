const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userAPI = require("./API/userAPI")();
const noteAPI = require("./API/noteAPI")();

require("dotenv").config();

const dbConnection = require("./DBConnection/db");

console.log("API_port ---> " + process.env.API_PORT);

let portNumber = process.env.API_PORT || 8080;
console.log("hello");


app.listen(portNumber, async function () {
  console.log("Server is running on " + portNumber);
  await dbConnection();
  app.use(bodyParser.json());
  app.use("/api/user/", userAPI);
  app.use("/api/note/", noteAPI);
});