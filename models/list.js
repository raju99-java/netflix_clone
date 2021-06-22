const mongoose = require("mongoose");

const listSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
  userId: String
});

module.exports = mongoose.model("List", listSchema);
