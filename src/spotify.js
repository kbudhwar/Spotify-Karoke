const SpotifyWebApi = require("spotify-web-api-node");

const root = "http://localhost:3000";

const spotify = new SpotifyWebApi({
  clientId: "fa075e634b5049babd10a972afab3454",
  clientSecret: "faf328a0714541e3bda2ff5810ba9f8e",
  redirectUri: root,
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

module.exports = { root, spotify, scopes };
