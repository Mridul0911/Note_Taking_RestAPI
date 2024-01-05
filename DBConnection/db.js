const mongoose = require("mongoose");
const bodyParser = require("body-parser");

require("dotenv").config();

async function connectToDB() {
  let mongoURI = process.env.MONGO_URI;
  console.log("mongo URI --------->>>>" + mongoURI);
  
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to mongodb URI: " + mongoURI);
  } catch (err) {
    console.error("Connection error", err);
  }
}

module.exports = connectToDB;
