const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const SpotifyWebApi = require("spotify-web-api-node");
const SpotifyStrategy = require("passport-spotify").Strategy;
const port = 8000 || process.env.PORT;
require("dotenv").config();

// Constants
const root = "http://localhost:3000";
const authCallbackPath = "/auth/spotify/callback";
const corsOptions = {
  origin: root,
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
const spotifyApi = new SpotifyWebApi({
  clientId: "fa075e634b5049babd10a972afab3454",
  clientSecret: "faf328a0714541e3bda2ff5810ba9f8e",
  redirectUri: root,
});
let accessToken;

// App
const app = express();

// Express Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "random",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cors(corsOptions));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Passport Session Setup
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

// Spotify Strategy
passport.use(
  new SpotifyStrategy(
    {
      // replace with process.env.NAME
      clientID: "fa075e634b5049babd10a972afab3454",
      clientSecret: "faf328a0714541e3bda2ff5810ba9f8e",
      callbackURL: "http://localhost:" + port + authCallbackPath,
    },
    function (accessToken, refreshToken, expires_in, profile, done) {
      spotifyApi.setAccessToken(`${accessToken}`);
      console.log("accesstoken", accessToken);
      process.nextTick(function () {
        // Returns user's spotify profile
        // Can assocaite spotify account with user record in db
        return done(null, profile);
      });
    }
  )
);

// Add Access Control Allow Origin headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/api", (req, res) => {
  res.json("Hello");
});

// Authenticate spotify user. First redirects to spotify.com
// If authentication works/fails, redirects to home (through
// callback). Access token is recieved if auth iis successful
app.get(
  "/auth/spotify",
  passport.authenticate("spotify", {
    scope: ["user-read-email", "user-read-private"],
    showDialog: true,
  }),
  (req, res) => {
    res.redirect("/~" + req.user.username);
  }
);

app.get(
  authCallbackPath,
  passport.authenticate("spotify", {
    successRedirect: root,
    failureRedirect: root,
  })
);

// Listen
app.listen(port, function () {
  console.log(`Server started on port ${port}`);
});
