const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Data_Schema = new Schema({
  word: { type: String },
  pos: { type: String },
  date: { type: String }
});

let Data = mongoose.model("data", Data_Schema);
module.exports = Data;
