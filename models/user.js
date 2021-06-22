const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
  dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
  userId: String
});

module.exports = mongoose.model("User", userSchema);
