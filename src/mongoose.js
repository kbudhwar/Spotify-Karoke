const mongoose = require("mongoose");

mongoose
  .connect("", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to databse.");
  })
  .catch(() => {
    console.log("Cannot connect to databse.");
  });

// Player Schema
const playerSchema = new mongoose.Schema({
  userid: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
});

// Player Model - name of collection will be Player
const Player = mongoose.model("Player", playerSchema);

const addPlayer = async (req) => {
  const newPlayer = new Player({
    userid: req.userid,
    username: req.username,
    email: req.email,
  });
  try {
    const result = await newPlayer.save();
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

exports.addPlayer = addPlayer;

// module.exports = Player && module.exports.addPlayer() =
