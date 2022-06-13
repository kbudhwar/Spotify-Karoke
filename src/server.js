const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const SpotifyStrategy = require("passport-spotify").Strategy;
const { root, spotify, scopes } = require("./spotify");
const port = 8000 || process.env.PORT;
require("dotenv").config();
const mongodb = require("./mongoose");

// Constants
const authCallbackPath = "/auth/spotify/callback";
const corsOptions = {
  origin: root,
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

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
      spotify.setAccessToken(`${accessToken}`);
      spotify.setRefreshToken(`${refreshToken}`);
      console.log("accesstoken", accessToken);
      process.nextTick(function () {
        // Returns user's spotify profile
        // Can assocaite spotify account with user record in db
        return done(null, profile);
      });
    }
  )
);

// Authenticate spotify user. First redirects to spotify.com
// If authentication works/fails, redirects to home (through
// callback). Access token is recieved if auth iis successful
app.get(
  "/auth/spotify",
  passport.authenticate("spotify", {
    scope: scopes,
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

app.get("/api", (req, res) => {
  res.json("Hello");
});

app.get("/me", (req, res) => {
  console.log(spotify.getAccessToken());
  spotify.getMe().then((user) => {
    console.log(user);
    mongodb.addPlayer({
      userid: user.body.id,
      username: user.body.display_name,
      email: user.body.email,
    });
  });
});

// Listen
app.listen(port, function () {
  console.log(`Server started on port ${port}`);
});
