const todoRepository = require('./todo.reposiroty');
const config = require('../../framework/config/env');

const controller = {

    getAllPaginated: async(page, idUser) => {

        const limit = parseInt(config.app.todoPerPage);
        const offset = parseInt((page - 1) * limit);

        const todos = await todoRepository.getAllPaginated(idUser, limit, offset)

        const totalTodo = parseInt(todoList.length);
        let nextPage = 1;

        if (parseInt(totalTodo + offset) <= parseInt(limit * page)) {
            nextPage = Math.floor(parseInt(totalTodo + offset) / parseInt(limit)) + 1;
        }

        return { todos, nextPage }

    },
    add: (idUser, name) => {

        const todoData = { name, status: 'pending', user: idUser }

        return todoRepository.insert(todoData)
    },
    edit: (id, status) => todoRepository.update(id, status),

    deleteTodo: (id) => todoRepository.delete(id)

};

module.exports = controller;