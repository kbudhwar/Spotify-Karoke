const SpotifyWebApi = require("spotify-web-api-node");
const express = require("express");
const router = express.Router();
const mongodb = require("./mongoose");
const lyricsFinder = require("lyrics-finder");

const geniusApiKey =
  "WYZyu4yOcnVPAg-gj15PrdOhunJhBvxRVG1lx-P8mvVVkfbu5KD0_J7c47lozuQX";

const spotify = new SpotifyWebApi({
  clientID: "940df94845c24a0f9dd21494900c2afd",
  clientSecret: "bc66dac4c7134b278b4e371742163be2",
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

// Retrieves Access Token for User
router.get("/getToken", (req, res) => {
  const accessToken = spotify.getAccessToken();
  res.send({ accessToken: accessToken });
});

// Saves logged-in user info to mongodb
router.get("/me", (req, res) => {
  console.log(spotify.getAccessToken());
  spotify
    .getMe()
    .then((user) => {
      console.log(user);
      mongodb.addPlayer({
        userid: user.body.id,
        username: user.body.display_name,
        email: user.body.email,
      });
    })
    .catch((err) => {
      console.log(err);
    });
  res.send();
});

router.get("/getPlaylists", (req, res) => {
  spotify
    .getUserPlaylists({ limit: 5 })
    .then((data) => {
      console.log("data: ", data.body);
      res.send({ playlists: data.body.items });
    })
    .catch((err) => {
      console.log(err);
    });
});
router.get("/getPlaylistTracks", (req, res) => {
  console.log(req.body);
  spotify
    .getPlaylistTracks(req.query.id)
    .then((data) => {
      console.log("playlisttrack: ", data.body.items);
      res.send({ tracks: data.body.items });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/lyrics", async (req, res) => {
  const options = {
    apiKey: geniusApiKey,
    title: req.query.name,
    artist: req.query.artist,
    optimizeQuery: true,
  };
  try {
    const lyrics = await lyricsFinder(req.query.artist, req.query.name);
    res.send({ lyrics: lyrics });
  } catch (e) {
    console.log(e);
  }
});

module.exports = { spotify, scopes, router };
