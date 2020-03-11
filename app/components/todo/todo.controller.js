const todoRepository = require('./todo.reposiroty');
const config = require('../../framework/config/env');

const controller = {

    getAllPaginated: async(page, idUser) => {

        const limit = parseInt(config.app.todoPerPage);
        const offset = parseInt((page - 1) * limit);

        const todos = await todoRepository.getAllPaginated(idUser, limit, offset)

        const total = await todoRepository.getTotal(idUser);

        const totalPerPage = parseInt(todos.length);
        let nextPage = 1;

        if (parseInt(totalPerPage + offset) <= parseInt(limit * page)) {
            nextPage = Math.floor(parseInt(totalPerPage + offset) / parseInt(limit)) + 1;
        }

        return { todos, nextPage, total }

    },
    get: (idUser, idTodo) => todoRepository.getById(idUser, idTodo),

    getByTerm: async(q, idUser) => {

        const regex = new RegExp(q, 'i');

        const todos = await todoRepository.getByRegex(regex, idUser)

        const total = todos.length;

        return { total, todos }
    },

    add: (idUser, name) => {

        const todoData = { name, status: 'pendiente', user: idUser }

        return todoRepository.insert(todoData)
    },
    edit: (id, name, status, idUser) => todoRepository.update(id, name, status, idUser),

    delete: (id) => todoRepository.delete(id)

};

module.exports = controller;