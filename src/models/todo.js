const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    day: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Todo', todoSchema);