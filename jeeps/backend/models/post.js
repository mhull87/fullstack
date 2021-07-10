const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  date: { type: String, required: true },
  location: { type: String, required: true },
  entry: { type: String, required: true },
  imagePath: { type: String, required: true }
});

module.exports = mongoose.model('Post', postSchema);
