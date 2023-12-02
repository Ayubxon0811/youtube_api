const mongoose = require("mongoose");
const config = require("../shared/config");

const db = () => {
  mongoose
    .connect(`mongodb+srv://ibrohimovu997:wPwFyk3yxZX3RkMt@cluster0.dajiuc6.mongodb.net/`)
    .then(() => {
      console.log("SERVER HAS BEEN CONNECTED TO DATABASE SUCCESSFULL");
    })
    .catch(() => {
      console.log("SERVER CAN NOT CONNECT TO DATABASE");
    });
};

module.exports = db;
