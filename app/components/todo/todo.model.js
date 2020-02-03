const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const todo = new Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'finalized']
    }
}, {
    timestamps: true
})


const Todo = mongoose.model('todo', todo);


module.exports = Todo;