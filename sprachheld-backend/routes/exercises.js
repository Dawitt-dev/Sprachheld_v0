const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Exercise = require('../models/Exercise');

// @route    POST api/exercises
// @desc     Create an exercise
// @access   Public (for now)
router.post(
  '/',
  [
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('difficulty', 'Difficulty is required').not().isEmpty(),
    check('category', 'Category is required').not().isEmpty(),
    check('createdBy', 'User is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, difficulty, category, createdBy } = req.body;

    try {
      const newExercise = new Exercise({
        title,
        description,
        difficulty,
        category,
        createdBy,
      });

      const exercise = await newExercise.save();

      res.json(exercise);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET /api/exercises
// @desc     Get all exercises
// @access   Public
router.get('/', async (req, res) => {
  try {
    const exercises = await Exercise.find().populate('category', ['name']).populate('createdBy', ['name']);
    res.json(exercises);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }

});

// @route    GET /api/exercises/:id
// @desc     Get exercise by ID
// @access   Public
router.get('/:id', async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id).populate('category', ['name']).populate('createdBy', ['name']);

    if (!exercise) {
      return res.status(404).json({ msg: 'Exercise not found' });
    }

    res.json(exercise);
  } catch (err) {
    console.error(err.message);

    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Exercise not found' });
    }

    res.status(500).send('Server Error');
  }
});

// @route    PUT /api/exercises/:id
// @desc     Update an exercise
// @access   Public (for now)
router.put('/:id', async (req, res) => {
  const { title, description, difficulty, category } = req.body;

  // Build exercise object
  const exerciseFields = {};
  if (title) exerciseFields.title = title;
  if (description) exerciseFields.description = description;
  if (difficulty) exerciseFields.difficulty = difficulty;
  if (category) exerciseFields.category = category;

  try {
    let exercise = await Exercise.findById(req.params.id);

    if (!exercise) {
         return res.status(404).json({ msg: 'Exercise not found' });
    }
    exercise = await Exercise.findByIdAndUpdate(
      req.params.id,
      { $set: exerciseFields },
      { new: true }
    );

    res.json(exercise);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    DELETE /api/exercises/:id
// @desc     Delete an exercise
// @access   Public (for now)

router.delete('/:id', async (req, res) => {
    try {
        const exercise = await Exercise.findById(req.params.id);
    
        if (!exercise) {
        return res.status(404).json({ msg: 'Exercise not found' });
        }
    
        await Exercise.findByIdAndDelete(req.params.id);
    
        res.json({ msg: 'Exercise removed' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Exercise not found' });
        }
        res.status(500).send('Server Error');
    }
});

module.exports = router;