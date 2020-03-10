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
    },
    user: {
        type: Schema.ObjectId,
        ref: 'user'
    }
}, {
    timestamps: true
})


const Todo = mongoose.model('todo', todo);


module.exports = Todo;