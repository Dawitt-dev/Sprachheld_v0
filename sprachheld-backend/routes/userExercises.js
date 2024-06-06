const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const UserExercise = require('../models/UserExercise');
const auth = require('../middleware/auth');

// @route    POST /api/userExercises
// @desc     Create or Update a user exercise
// @access   Public (for now)
router.post(
    '/',
    [
        check('userId', 'User ID is required').not().isEmpty(),
        check('exerciseId', 'Exercise ID is required').not().isEmpty(),
        check('status', 'Status is required').isIn(['completed', 'in-progress', 'not-started']),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { userId, exerciseId, status, answers, currentQuestionIndex } = req.body;

        try {
            let userExercise = await UserExercise.findOne({ userId, exerciseId });

            if (userExercise) {
                userExercise.status = status;
                userExercise.answers = answers;
                userExercise.currentQuestionIndex = currentQuestionIndex;
                userExercise.date = Date.now();
                await userExercise.save();
                return res.json(userExercise);
            }

            const newUserExercise = new UserExercise({
                userId,
                exerciseId,
                status,
                answers,
                currentQuestionIndex
            });

            userExercise = await newUserExercise.save();
            res.json(userExercise);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route    GET /api/userExercises
// @desc     Get all user exercises or filter by user ID
// @access   Private
router.get('/', auth, async (req, res) => {
    const { userId } = req.query;
    if (!userId) {
        return res.status(400).json({ msg: 'User ID is required' });
    }

    try {
        const userExercises = await UserExercise.find({ userId })
            .populate('userId', ['name'])
            .populate('exerciseId', ['title']);
        res.json(userExercises);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// @route    GET /api/userExercises/:id
// @desc     Get user exercise by ID
// @access   Public
router.get('/:id', auth, async (req, res) => {
    try {
        const userExercise = await UserExercise.findById(req.params.id)
            .populate('userId', ['name'])
            .populate('exerciseId', ['title']);

        if (!userExercise) {
            return res.status(404).json({ msg: 'User Exercise not found' });
        }
        res.json(userExercise);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'User Exercise not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @route    GET /api/userExercises/:exerciseId/:userId
// @desc     Get exercise progress for a user
// @access   Private
router.get('/:exerciseId/:userId', auth, async (req, res) => {
    try {
        const { exerciseId, userId } = req.params;
        const userExercise = await UserExercise.findOne({ exerciseId, userId });

        if (!userExercise) {
            return res.status(404).json({ msg: 'Progress not found' });
        }

        res.json(userExercise);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
