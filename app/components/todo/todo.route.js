const todoController = require("./todo.controller");
const todoValidator = require("./todo.validator");
const authMiddleware = require("../../framework/middlewares/auth.middleware");

const route = {
    init: router => {


        router.route('/todo').get(
            authMiddleware.isLoggedIn,
            todoValidator.getAllPaginated,
            async(req, res, next) => {
                try {
                    const idUser = req.uid;
                    const { page } = req.query;
                    const todoList = await todoController.getAllPaginated(page, idUser);
                    const response = {
                        ok: true,
                        content: {
                            message: 'Todo List',
                            todos: todoList
                        }
                    }

                    res.status(200).json(response);

                } catch (error) {

                    next({
                        error: error,
                        status: 500
                    });

                }
            });


        router.route('/todo').post(
            authMiddleware.isLoggedIn,
            todoValidator.add,
            async(req, res, next) => {

                const idUser = req.uid;

                const { name } = req.body;

                try {

                    const addedTodo = await todoController.add(idUser, name);

                    const response = {
                        ok: true,
                        content: {
                            message: 'Todo added successful',
                            todo: addedTodo
                        }
                    }

                    res.status(200).json(response);

                } catch (error) {
                    next({
                        error: error,
                        status: 500
                    })
                }
            });



        router.route('/todo/:idTodo').put(
            authMiddleware.isLoggedIn,
            todoValidator.update,
            async(req, res, next) => {

                const { idTodo } = req.params;

                const { status } = req.body;

                try {

                    const updatedTodo = await todoController.edit(idTodo, status);

                    const response = {
                        ok: true,
                        content: {
                            message: 'Todo updated successful',
                            todo: updatedTodo
                        }
                    }

                    res.status(200).json(response);

                } catch (error) {
                    next({
                        error: error,
                        status: 500
                    })
                }
            });

        router.route('/todo/:idTodo').delete(
            authMiddleware.isLoggedIn,
            todoValidator.delete,
            async(req, res, next) => {

                const { idTodo } = req.params;

                try {

                    const deleted = await todoController.delete(idTodo);

                    const response = {
                        ok: true,
                        content: {
                            message: 'Todo deleted successful',
                            status: deleted
                        }
                    }

                    res.status(200).json(response);

                } catch (error) {
                    next({
                        error: error,
                        status: 500
                    })
                }


            });


    }
};

module.exports = route;