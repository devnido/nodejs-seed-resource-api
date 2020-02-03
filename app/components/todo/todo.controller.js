const todoRepository = require('./todo.reposiroty');
const config = require('../../framework/config/env');

const controller = {

    getTodoList: (page) => new Promise((resolve, reject) => {

        const limit = parseInt(config.app.todoPerPage);
        const offset = parseInt((page - 1) * limit);

        todoRepository.getAllTodoPaginated(limit, offset)
            .then(todoList => {
                const totalTodo = parseInt(todoList.length);
                let nextPage = 1;

                if (parseInt(totalTodo + offset) <= parseInt(limit * page)) {
                    nextPage = Math.floor(parseInt(totalTodo + offset) / parseInt(limit)) + 1;
                }

                resolve({
                    todoList: todoList,
                    nextPage: nextPage
                });
            })
            .catch(err => {
                reject(err);
            });

    }),
    addTodo: (name) => new Promise((resolve, reject) => {

        const todoData = {
            name: name,
            status: 'pending'
        };

        todoRepository.insertTodo(todoData)
            .then(todo => resolve(todo))
            .catch(error => reject(error))


    }),
    updateTodo: (id, status) => new Promise((resolve, reject) => {

        todoRepository.updateTodo(id, status)
            .then(todo => resolve(todo))
            .catch(error => reject(error))


    }),
    deleteTodo: (id) => new Promise((resolve, reject) => {


        todoRepository.deleteTodo(id)
            .then(todo => resolve(todo))
            .catch(error => reject(error))

    })

};

module.exports = controller;