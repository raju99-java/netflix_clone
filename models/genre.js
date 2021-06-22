const mongoose = require("mongoose");

const genreSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  id: Number
});

module.exports = mongoose.model("Genre", genreSchema);
