const mongoose = require("mongoose");
// Shortcut variable
const Schema = mongoose.Schema;

const playerSchema = new Schema({
  playername: {
    type: String,
    required: true,
  },
  nationality: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
});

module.exports = mongoose.model("Player", playerSchema);