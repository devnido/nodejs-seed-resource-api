const repository = ({ Todo }) => ({

    existsById: id => Todo.exists({ _id: id }),

    existsByName: (name, user) => Todo.exists({ name, user }),

    existsByNameAndAnotherId: (idTodo, name) => Todo.exists({ name, _id: { $ne: idTodo } }),

    getTotal: user => Todo.countDocuments({ user }),

    getAllPaginated: (user, limit, offset) => Todo.find({ user }).sort({ createdAt: 'desc' }).limit(limit).skip(offset),

    getById: (user, idTodo) => Todo.findOne({ _id: idTodo, user }),

    getByRegex: (regex, user) => Todo.find({ user }).or([{ 'name': regex }, { 'status': regex }]),

    insert: ({ name, status, user }) => new Todo({ name, status, user }).save(),

    update: (id, name, status, user) => Todo.findOneAndUpdate({ _id: id, user }, { name, status }, { new: true }),

    delete: id => Todo.deleteOne({ _id: id })

})

module.exports = repository