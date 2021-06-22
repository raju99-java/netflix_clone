const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const jwt = require("express-jwt"); // Validate JWT and set req.user
const jwksRsa = require("jwks-rsa"); // Retrieve RSA keys from a JSON Web Key set (JWKS) endpoint
const mongoose = require("mongoose");

mongoose.connect(process.env.REMOTE_SERVER, {
  useNewUrlParser: true
});

mongoose.connection
  .on("connected", function() {
    console.log("Successfully connected to Database");
  })
  .then(() => console.log("worked"), err => console.log(err));

const Video = require("./models/video");
const Genre = require("./models/genre");
const List = require("./models/list");
const User = require("./models/user");

const checkJwt = jwt({
  // Dynamically provide a signing key based on the kid in the header
  // and the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true, // cache the signing key
    rateLimit: true,
    jwksRequestsPerMinute: 5, // prevent attackers from requesting more than 5 per minute
    jwksUri: `https://${
      process.env.REACT_APP_AUTH0_DOMAIN
    }/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  issuer: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/`,

  // This must match the algorithm selected in the Auth0 dashboard under your app's advanced settings under the OAuth tab
  algorithms: ["RS256"]
});

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.post("/list", function(req, res) {
  const newUserId = req.body.user.id;
  const newVideoId = req.body.video.id;
  // Video.findById(videoId, (err, video) => {
  //   return video;
  // }).then(video => console.log(video));
  /* todo validate video*/

  List.findOne({ userId: newUserId }, (err, list) => {
    return list;
  }).then(list => {
    list === null
      ? (list = new List({
          _id: new mongoose.Types.ObjectId(),
          userId: newUserId
        }))
      : list;

    list.videos.push(newVideoId);
    list.save();
  });
});
app.post("/users/update", (req, res) => {
  const newUserId = req.body.user.id;
  const newVideoId = req.body.video.id;
  const action = req.body.action;

  User.findOne({ userId: newUserId }, (err, user) => {
    /* Find user*/
    return user;
  }).then(user => {
    user === null
      ? /* If user doesnt exist, Create a new one*/
        (user = new User({
          _id: new mongoose.Types.ObjectId(),
          userId: newUserId
        }))
      : /* Otherwise, append to user that matches id*/
        user;

    const addTo = field => {
      user[field] = [...user[field], newVideoId];
    };
    const removeFrom = field => {
      user[field] = user[field].filter(id => id != newVideoId);
    };
    const update = field => {
      if (action.payload) {
        addTo(field);
      } else {
        removeFrom(field);
      }
    };
    switch (action.type) {
      case "FAVORITE":
        if (!user.favorites.includes(newVideoId)) update("favorites", user);
        break;
      case "LIKE":
        if (!user.likes.includes(newVideoId)) {
          update("likes", user);
          if (user.dislikes.includes(newVideoId)) {
            removeFrom("dislikes");
          }
        }

        break;
      case "DISLIKE":
        if (!user.dislikes.includes(newVideoId)) {
          update("dislikes", user);
          if (user.likes.includes(newVideoId)) {
            removeFrom("likes");
          }
        }
        break;
    }
    user.save();
  });
});

app.get("/user/:userId", function(req, res) {
  const userId = req.params.userId;
  // return user
  User.findOne({ userId: userId })
    .populate("favorites likes dislikes")
    .exec((err, user) => {
      if (user === null) {
        user = new User({
          _id: new mongoose.Types.ObjectId(),
          userId: userId
        });
      }
      console.log(user);
      res.status(200).json(user);
    });
});
app.get("/videos", function(req, res) {
  Video.find({}).then(videos => res.status(200).json(videos));
});
app.get("/genres", function(req, res) {
  Genre.find({}).then(genres => res.status(200).json(genres));
});

app.get("/search", function(req, res, next) {
  try {
    if (req.query.q) {
      let query = req.query.q.toLowerCase().replace(/'/, "");
      console.log(query);

      const regex = new RegExp(query, "i");
      Video.find({ title: regex }).then(
        videos => {
          res.status(200).json(videos);
        },
        err => {
          res.status(500).json([]);
        }
      );
    } else {
      throw new Error("empty query found");
    }
  } catch (e) {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Server error: " + e.message);
  }
});

app.get("/private", checkJwt, function(req, res) {
  console.log("login details: " + req);
  res.json({
    message: "Hello from a private API!"
  });
});

app.listen(3001);
console.log("API server listening on " + process.env.REACT_APP_AUTH0_AUDIENCE);
