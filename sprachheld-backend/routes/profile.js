const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const UserExercise = require('../models/UserExercise');
const Exercise = require('../models/Exercise');

// @route    GET api/profile
// @desc     Get current user's profile
// @access   Private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        const userExercises = await UserExercise.find({ userId: req.user.id }).populate('exerciseId', ['title']);
        
        const profile = {
            name: user.name,
            email: user.email,
            completedExercises: userExercises.map(ue => ue.exerciseId)
        };

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;