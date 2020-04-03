const route = ({ authMiddleware, userValidator, userRouteHandler }) => ({

    init: (router) => {

        router.route('/users/:idUser/password').put(
            authMiddleware.isLoggedIn,
            userValidator.isLoggedUser,
            userValidator.changePassword,
            userRouteHandler.changePassword)

        router.route('/users/:idUser/info').put(
            authMiddleware.isLoggedIn,
            userValidator.isLoggedUser,
            userValidator.changeUserInfo,
            userRouteHandler.changeUserInfo)

    }

})

module.exports = route