const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userAPI = require("./API/userAPI")();
const noteAPI = require("./API/noteAPI")();
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
  });
  
app.use(limiter);
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