const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');         
const app = express();
const PORT = process.env.PORT || 5000;
// ... (previous code)

const songsRoutes = require('./route/songs');

app.use('/api', songsRoutes); // Use "/api" as a prefix for your routes

// ... (rest of the code)
app.get('/api/songs', async (req, res) => {
    try {
      const searchTerm = req.query.term || 'latest%20Items'; // Default search term
      const limit = req.query.limit || 15; // Default limit
  
      const iTunesURL = `https://itunes.apple.com/search?term=${searchTerm}&limit=${limit}`;
      const response = await axios.get(iTunesURL);
  
      res.json(response.data.results);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/musicapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
