
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const port = 8000 || process.env.PORT;
require('dotenv').config();

// Constants
var authCallbackPath = '/auth/spotify/callback';

// App
const app = express();

// Use Express Middleware 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'random', resave: true, saveUninitialized: true
})
)
// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Passport Session Setup
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// Spotify Strategy
passport.use( new SpotifyStrategy({
      clientID: 'fa075e634b5049babd10a972afab3454',
      clientSecret: 'faf328a0714541e3bda2ff5810ba9f8e',
      callbackURL: 'http://localhost:' + port + authCallbackPath,
    },
    function (accessToken, refreshToken, expires_in, profile, done) {
      process.nextTick(function () {
        // Returns user's spotify profile
        // Can assocaite spotify account with user record in db
        return done(null, profile);
      });
    }
  )
);

// Authenticate spotify user. First redirects to spotify.com
// If authentication works, redirects to home (through 
// (callback), otherwise login page
app.get(
  '/auth/spotify',
  passport.authenticate('spotify', {
    scope: ['user-read-email', 'user-read-private'],
    showDialog: true,
  })
);

app.get(
  authCallbackPath,
  passport.authenticate('spotify', {failureRedirect: '/login'}),
  function (req, res) {
    res.redirect('http://localhost:3000');
  }
);





// Listen
app.listen(port, function() {
  console.log(`Server started on port ${port}`);
});