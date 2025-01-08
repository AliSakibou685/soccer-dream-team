const mongoose = require("mongoose");
const user = require("./user");
// Shortcut variable
const Schema = mongoose.Schema;

const playerSchema = new Schema({
  name: {
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
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model("Player", playerSchema);