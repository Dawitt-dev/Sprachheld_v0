const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const UserExercise = require('../models/UserExercise');

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
        if (!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
        }
    
        const { userId, exerciseId, status } = req.body;

        try {
            let userExercise = await UserExercise.findOne({ userId, exerciseId });

            if (userExercise) {
                userExercise.status = status;
                userExercise = status;
                userExercise = Date.now();
                await userExercise.save();
                return res.json(userExercise);
            }
            
            const newUserExercise = new UserExercise({
                userId,
                exerciseId,
                status,
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
// @desc     Get all user exercises
// @access   Public
router.get('/', async (req, res) => {
    try {
        const userExercises = await UserExercise.find().populate('userId', ['name']).populate('exerciseId', ['title']);
        res.json(userExercises);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    GET /api/userExercises/:id
// @desc     Get user exercise by ID
// @access   Public
router.get('/:id', async (req, res) => {
    try {
        const userExercise = await UserExercise.findById(req.params.id).populate('userId', ['name']).populate('exerciseId', ['title']);

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

module.exports = router;