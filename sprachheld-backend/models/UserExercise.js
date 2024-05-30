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
        enum: ['completed', 'in-progress', 'not started'],
        default: 'not started',
    },
    currentQuestionIndex: {
        type: Number,
        default: 0,
    },
    answers: {
        type: Map,
        of: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('UserExercise', UserExerciseSchema);