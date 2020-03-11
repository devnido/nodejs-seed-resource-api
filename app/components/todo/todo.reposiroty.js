const Todo = require('./todo.model');

const repository = {

    existsById: id => Todo.exists({ _id: id }),

    existsByName: name => Todo.exists({ name }),

    existsByNameAndAnotherId: (idTodo, name) => Todo.exists({ name, _id: { $ne: idTodo } }),

    getAllPaginated: (idUser, limit, offset) => Todo.find({ user: idUser }).limit(limit).skip(offset),

    getById: (idUser, idTodo) => Todo.findOne({ _id: idTodo, user: idUser }),

    getByTerm: term => {

        const regex = new RegExp(term, 'i');

        return Todo.find({}).or([{ 'name': regex }, { 'status': regex }])
    },

    insert: ({ name, status, idUser }) => new Todo({ name, status, user: idUser }).save(),

    update: (id, name, status) => Todo.findByIdAndUpdate(id, { name, status }, { new: true }),

    delete: id => Todo.deleteOne({ _id: id })

}

module.exports = repository;