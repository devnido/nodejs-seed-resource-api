const todoController = require("./todo.controller");
const todoValidator = require("./todo.validator");
const authMiddleware = require("../../framework/middlewares/auth.middleware");

const route = {
    init: router => {


        router.route('/todo').get(
            todoValidator.getAllPaginated,
            async(req, res, next) => {
                try {
                    const { page } = req.query;
                    const todoList = await todoController.getAllPaginated(page);
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
            todoValidator.add,
            async(req, res, next) => {

                const { name } = req.body;

                try {

                    const addedTodo = await todoController.add(name);

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



        router.route('/todo/:id').put(
            todoValidator.update,
            async(req, res, next) => {

                const { id } = req.params;

                const { status } = req.body;

                try {

                    const updatedTodo = await todoController.update(id, status);

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

        router.route('/todo/:id').delete(
            todoValidator.delete,
            async(req, res, next) => {

                const { id } = req.params;

                try {

                    const deleted = await todoController.delete(id);

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