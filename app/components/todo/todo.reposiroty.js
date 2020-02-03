const Todo = require('./todo.model');

const repository = {
    existsById: id => new Promise((resolve, reject) => {
        Todo.findById(id)
            .then(todo => {
                if (todo) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            })
            .catch(err => reject(err));
    }),
    existsByName: name => new Promise((resolve, reject) => {
        Todo.find({
            name: name
        }).then(todo => {

            if (todo) {
                resolve(true);
            } else {
                resolve(false);
            }

        }).catch(err => reject(err));
    }),
    getAllTodoPaginated: (limit, offset) => new Promise((resolve, reject) => {
        Todo.find()
            .limit(limit)
            .skip(offset)
            .then(todoList => resolve(todoList))
            .catch(error => reject(error))
    }),
    insertTodo: todoData => new Promise((resolve, reject) => {
        new Todo(todoData)
            .save()
            .then(_todo => {
                // quitar extras como __v o propiedades que no deben mostrarse
                let todo = _todo.toObject();

                delete todo["__v"];

                resolve(todo);
            })
            .catch(error => reject(error));
    }),
    updateTodo: (id, status) => new Promise((resolve, reject) => {
        Todo.findByIdAndUpdate(id, { status: status }, { new: true })
            .then(_todo => {
                // quitar extras como __v o propiedades que no deben mostrarse
                let todo = _todo.toObject();

                delete todo["__v"];

                resolve(todo);
            })
            .catch(error => reject(error));
    }),

    deleteTodo: (id) => new Promise((resolve, reject) => {
        Todo.deleteOne({ _id: id })
            .then(result => resolve(result))
            .catch(error => reject(error));
    }),

}

module.exports = repository;