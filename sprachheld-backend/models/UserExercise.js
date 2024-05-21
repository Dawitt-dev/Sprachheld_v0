const mongoose = require('mongoose');

const UserExerciseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    exerciseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exercise',
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['completed', 'in progress', 'not started'],
        default: 'not started',
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('UserExercise', UserExerciseSchema);