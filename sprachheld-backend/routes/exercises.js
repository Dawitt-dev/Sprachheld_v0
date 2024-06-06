const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Exercise = require('../models/Exercise');
const auth = require('../middleware/auth');

// @route    GET /api/exercises
// @desc     Get all exercises
// @access   Public
router.get('/', async (req, res) => {
    try {
        const exercises = await Exercise.find();
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
        const exercise = await Exercise.findById(req.params.id);

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

module.exports = router;
