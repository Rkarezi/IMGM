const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
});

const playListSchema = new Schema({
  playlistName: { type: String, required: true },
  playlistDesc: { type: String, required: true },
  playlistURI: { type: String, required: true },
  track: { type: Array, required: true },
  user: { type: Schema.Types.ObjectId, ref: "users" },
});

const Users = mongoose.model("users", userSchema, "users");
const PlayLists = mongoose.model("playlist", playListSchema, "playlist");

const mySchemas = { Users: Users, PlayLists: PlayLists };

module.exports = mySchemas;
