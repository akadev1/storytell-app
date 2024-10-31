const mongoose = require('mongoose');

const sceneSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  chapter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chapter',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  choices: [{
    text: {
      type: String,
      required: true,
    },
    nextScene: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Scene',
    },
  }],
});

const Scene = mongoose.model('Scene', sceneSchema);

module.exports = Scene;
