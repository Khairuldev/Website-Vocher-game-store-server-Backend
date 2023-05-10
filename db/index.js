const mongoose = require("mongoose");
const { urlDb } = require("../config");

var MongoClient = require("mongodb").MongoClient;

mongoose.connect(urlDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true,
});

const db = mongoose.connection;

module.exports = db;
