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
                    const { todos, nextPage, total } = await todoController.getAllPaginated(page, idUser);
                    const response = {
                        ok: true,
                        content: {
                            message: 'Todo List',
                            todos,
                            nextPage,
                            total
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

        router.route('/todo/:idTodo').get(
            authMiddleware.isLoggedIn,
            todoValidator.get,
            async(req, res, next) => {

                const { idTodo } = req.params;

                const idUser = req.uid;

                try {

                    const todo = await todoController.get(idUser, idTodo);

                    console.log('todo', todo);


                    const response = {
                        ok: true,
                        content: {
                            message: 'Todo updated successful',
                            todo
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


        router.route('/todo/:q/search').get(
            authMiddleware.isLoggedIn,
            todoValidator.search,
            async(req, res, next) => {

                try {

                    const { q } = req.params;

                    const { todos, total } = await todoController.getByTerm(q);

                    const response = {
                        ok: true,
                        content: {
                            message: 'resultado de la busqueda de tareas',
                            todos,
                            total
                        }
                    }

                    if (todos && total) {

                        res.status(200).json(response);

                    } else {
                        response.content.agencies = [];
                        response.content.total = 0;
                        res.status(200).json(response);
                    }


                } catch (error) {
                    next(error);
                }

            })





        router.route('/todo/:idTodo').put(
            authMiddleware.isLoggedIn,
            todoValidator.update,
            async(req, res, next) => {

                const { idTodo } = req.params;

                const { name, status } = req.body;

                try {

                    const updatedTodo = await todoController.edit(idTodo, name, status);

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