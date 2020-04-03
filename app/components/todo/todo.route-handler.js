const handler = ({ todoController }) => ({
    getAllPaginated: async(req, res, next) => {
        try {
            const idUser = req.uid
            const { page } = req.query
            const { todos, nextPage, total } = await todoController.getAllPaginated(page, idUser)
            const response = {
                ok: true,
                content: {
                    message: 'Todo List',
                    todos,
                    nextPage,
                    total
                }
            }

            res.status(200).json(response)

        } catch (error) {

            next({
                error: error,
                status: 500
            })

        }
    },
    add: async(req, res, next) => {

        const idUser = req.uid

        const { name } = req.body

        try {

            const addedTodo = await todoController.add(idUser, name)

            const response = {
                ok: true,
                content: {
                    message: 'Todo added successful',
                    todo: addedTodo
                }
            }

            res.status(200).json(response)

        } catch (error) {
            next({
                error: error,
                status: 500
            })
        }
    },
    get: async(req, res, next) => {

        const { idTodo } = req.params

        const idUser = req.uid

        try {

            const todo = await todoController.get(idUser, idTodo)

            const response = {
                ok: true,
                content: {
                    message: 'Todo updated successful',
                    todo
                }
            }

            res.status(200).json(response)

        } catch (error) {
            next({
                error: error,
                status: 500
            })
        }
    },
    search: async(req, res, next) => {

        try {

            const { q } = req.params

            const idUser = req.uid

            const { todos, total } = await todoController.getByTerm(q, idUser)

            const response = {
                ok: true,
                content: {
                    message: 'resultado de la busqueda de tareas',
                    todos,
                    total
                }
            }

            if (todos && total) {

                res.status(200).json(response)

            } else {
                response.content.agencies = []
                response.content.total = 0
                res.status(200).json(response)
            }


        } catch (error) {
            next(error)
        }

    },
    update: async(req, res, next) => {

        const { idTodo } = req.params

        const { name, status } = req.body

        const idUser = req.uid

        try {

            const updatedTodo = await todoController.edit(idTodo, name, status, idUser)

            const response = {
                ok: true,
                content: {
                    message: 'Todo updated successful',
                    todo: updatedTodo
                }
            }

            res.status(200).json(response)

        } catch (error) {
            next({
                error: error,
                status: 500
            })
        }
    },
    delete: async(req, res, next) => {

        const { idTodo } = req.params

        try {

            const deleted = await todoController.delete(idTodo)

            const response = {
                ok: true,
                content: {
                    message: 'Todo deleted successful',
                    status: deleted
                }
            }

            res.status(200).json(response)

        } catch (error) {
            next({
                error: error,
                status: 500
            })
        }


    }
})

module.exports = handler