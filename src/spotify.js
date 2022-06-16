const SpotifyWebApi = require("spotify-web-api-node");
const express = require("express");
const router = express.Router();
const mongodb = require("./mongoose");

const spotify = new SpotifyWebApi({
  clientId: "fa075e634b5049babd10a972afab3454",
  clientSecret: "faf328a0714541e3bda2ff5810ba9f8e",
  redirectUri: "http://localhost:3000",
});

const scopes = [
  "ugc-image-upload",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "streaming",
  "app-remote-control",
  "user-read-email",
  "user-read-private",
  "playlist-read-collaborative",
  "playlist-modify-public",
  "playlist-read-private",
  "playlist-modify-private",
  "user-library-modify",
  "user-library-read",
  "user-top-read",
  "user-read-playback-position",
  "user-read-recently-played",
  "user-follow-read",
  "user-follow-modify",
];

// Saves logged-in user info to mongodb
router.get("/me", (req, res) => {
  console.log(spotify.getAccessToken());
  spotify.getMe().then((user) => {
    console.log(user);
    mongodb.addPlayer({
      userid: user.body.id,
      username: user.body.display_name,
      email: user.body.email,
    });
  });
  res.send();
});

router.get("/getPlaylists", (req, res) => {
  spotify.getUserPlaylists({ limit: 5 }).then((data) => {
    console.log("data: ", data.body);
    res.send({ playlists: data.body.items });
  });
});

module.exports = { spotify, scopes, router };
