const mongoose = require("mongoose");

const videoSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  id: Number,
  title: String,
  type: String,
  videoId: String,
  genres: Array,
  vote_average: Number,
  overview: String
});

module.exports = mongoose.model("Video", videoSchema);

/* 
Use this command to import data into database:

mongoimport --host notflix-shard-0/notflix-shard-00-00-eiper.mongodb.net:27017,notflix-shard-00-01-eiper.mongodb.net:27017,notflix-shard-00-02-eiper.mongodb.net:27017 --ssl --username james123 --password james123 --authenticationDatabase admin --db notflixdb --collection videos --type json --file videos.json --jsonArray


import to local db

// Remember to remove null items
 mongoimport --db notflixLocalDB --collection videos --type json --file videos.json --jsonArray

*/
