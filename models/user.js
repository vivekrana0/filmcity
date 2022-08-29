var mongoose = require('mongoose');

var watchlistSchema = new mongoose.Schema({
    title: String,
    rating: Number
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