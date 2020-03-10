const Todo = require('./todo.model');

const repository = {

    existsById: id => Todo.exists({ _id: id }),

    existsByName: name => Todo.exists({ name }),

    getAllPaginated: (idUser, limit, offset) => Todo.find({ user: idUser }).limit(limit).skip(offset),

    insert: ({ name, status, idUser }) => new Todo({ name, status, user: idUser }).save(),

    update: (id, status) => Todo.findByIdAndUpdate(id, { status }, { new: true }),

    delete: id => Todo.deleteOne({ _id: id })

}

module.exports = repository;