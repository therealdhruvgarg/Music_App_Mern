// models/Song.js
const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  artistName: String,
  trackName: String,
  artworkUrl100: String,
  previewUrl: String,
});

module.exports = mongoose.model('Song', songSchema);
