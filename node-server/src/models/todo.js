const mongoose = require('mongoose')

const Todo = mongoose.model('Todo', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    userId: {
        type: String,
        required: true,
        trim: true
    }
})

module.exports = Todo