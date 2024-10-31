const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  story: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Story',
    required: true,
  },
  scenes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Scene',
  }],
});

const Chapter = mongoose.model('Chapter', chapterSchema);

module.exports = Chapter;
