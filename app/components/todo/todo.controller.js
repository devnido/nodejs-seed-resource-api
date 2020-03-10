const todoRepository = require('./todo.reposiroty');
const config = require('../../framework/config/env');

const controller = {

    getAllPaginated: async(page, idUser) => {

        const limit = parseInt(config.app.todoPerPage);
        const offset = parseInt((page - 1) * limit);

        const todos = await todoRepository.getAllPaginated(idUser, limit, offset)

        const total = parseInt(todos.length);
        let nextPage = 1;

        if (parseInt(total + offset) <= parseInt(limit * page)) {
            nextPage = Math.floor(parseInt(total + offset) / parseInt(limit)) + 1;
        }

        return { todos, nextPage, total }

    },
    add: (idUser, name) => {

        const todoData = { idUser, name, status: 'pending' }

        return todoRepository.insert(todoData)
    },
    edit: (id, status) => todoRepository.update(id, status),

    delete: (id) => todoRepository.delete(id)

};

module.exports = controller;