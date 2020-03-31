const { getAllPaginated, getTotal, getById, getByRegex, insert, update } = require('./todo.reposiroty');
const { app } = require('../../framework/config/env');

const controller = {

    getAllPaginated: async(page, idUser) => {

        const limit = parseInt(app.todoPerPage);
        const offset = parseInt((page - 1) * limit);

        const todos = await getAllPaginated(idUser, limit, offset)

        const total = await getTotal(idUser);

        const totalPerPage = parseInt(todos.length);
        let nextPage = 1;

        if (parseInt(totalPerPage + offset) <= parseInt(limit * page)) {
            nextPage = Math.floor(parseInt(totalPerPage + offset) / parseInt(limit)) + 1;
        }

        return { todos, nextPage, total }

    },
    get: (idUser, idTodo) => getById(idUser, idTodo),

    getByTerm: async(q, idUser) => {

        const regex = new RegExp(q, 'i');

        const todos = await getByRegex(regex, idUser)

        const total = todos.length;

        return { total, todos }
    },

    add: (idUser, name) => {

        const todoData = { name, status: 'pendiente', user: idUser }

        return insert(todoData)
    },
    edit: (id, name, status, idUser) => update(id, name, status, idUser),

    delete: (id) => delete(id)

};

module.exports = controller;