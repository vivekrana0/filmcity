var mongoose = require('mongoose');

var watchlistSchema = new mongoose.Schema({
    original_title: String,
    vote_average: Number,
    poster_path: String,
    overview: String,
    homepage: String,
    tagline: String,
    id: Number
  }, {
    timestamps: true
  });

var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    watchlist: [watchlistSchema],
    googleId: String
  }, {
    timestamps: true
  });

  module.exports = mongoose.model('User', userSchema);