const express = require('express');
const Story = require('../models/Story');
const Chapter = require('../models/Chapter');
const Scene = require('../models/Scene');

const router = express.Router();

// Create a new story
router.post('/', async (req, res) => {
  const { title, author } = req.body;

  try {
    const story = new Story({ title, author });
    await story.save();
    res.status(201).json(story);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all stories
router.get('/', async (req, res) => {
  try {
    const stories = await Story.find().populate('author', 'username');
    res.status(200).json(stories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single story by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const story = await Story.findById(id).populate('author', 'username').populate({
      path: 'chapters',
      populate: {
        path: 'scenes',
      },
    });
    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }
    res.status(200).json(story);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a story by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  try {
    const story = await Story.findByIdAndUpdate(id, { title }, { new: true });
    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }
    res.status(200).json(story);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a story by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const story = await Story.findByIdAndDelete(id);
    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }
    res.status(200).json({ message: 'Story deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new chapter
router.post('/:storyId/chapters', async (req, res) => {
  const { storyId } = req.params;
  const { title } = req.body;

  try {
    const chapter = new Chapter({ title, story: storyId });
    await chapter.save();

    const story = await Story.findById(storyId);
    story.chapters.push(chapter);
    await story.save();

    res.status(201).json(chapter);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Create a new scene
router.post('/:storyId/chapters/:chapterId/scenes', async (req, res) => {
  const { chapterId } = req.params;
  const { title, content, choices } = req.body;

  try {
    const scene = new Scene({ title, chapter: chapterId, content, choices });
    await scene.save();

    const chapter = await Chapter.findById(chapterId);
    chapter.scenes.push(scene);
    await chapter.save();

    res.status(201).json(scene);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
