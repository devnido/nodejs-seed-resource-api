const route = ({ todoRouteHandler, todoValidator, authMiddleware }) => ({
    init: router => {

        router.route('/todo').get(authMiddleware.isLoggedIn, todoValidator.getAllPaginated, todoRouteHandler.getAllPaginated)

        router.route('/todo').post(authMiddleware.isLoggedIn, todoValidator.add, todoRouteHandler.add)

        router.route('/todo/:idTodo').get(authMiddleware.isLoggedIn, todoValidator.get, todoRouteHandler.get)

        router.route('/todo/:q/search').get(authMiddleware.isLoggedIn, todoValidator.search, todoRouteHandler.search)

        router.route('/todo/:idTodo').put(authMiddleware.isLoggedIn, todoValidator.update, todoRouteHandler.update)

        router.route('/todo/:idTodo').delete(authMiddleware.isLoggedIn, todoValidator.delete, todoRouteHandler.delete)

    }
})

module.exports = route