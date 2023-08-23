// routes/songs.js
const express = require('express');
const router = express.Router();
const Song = require('../model/song');

router.get('/songs', async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
