const userValidator = require('./user.validation');
const userController = require('./user.controller');
const authMiddleware = require('../../framework/middlewares/auth.middleware');

const route = {

    init: (router) => {

        router.route('/users/:idUser/password').put(
            authMiddleware.isLoggedIn,
            userValidator.isLoggedUser,
            userValidator.changePassword,
            async(req, res, next) => {
                try {
                    const { idUser } = req.params;

                    const { newPassword } = req.body;

                    const resultUpdated = await userController.changePassword(idUser, newPassword);

                    if (resultUpdated) {

                        const response = {
                            ok: true,
                            content: {
                                message: 'usuario actualizado'
                            }
                        }

                        res.status(200).json(response);
                    } else {
                        next({
                            error: 'error en change password',
                            status: 500
                        });
                    }
                } catch (error) {
                    next(error);
                }
            })

        router.route('/users/:idUser/info').put(
            authMiddleware.isLoggedIn,
            userValidator.isLoggedUser,
            userValidator.changeUserInfo,
            async(req, res, next) => {
                try {
                    const { idUser } = req.params;

                    const { name } = req.body;

                    const userUpdated = await userController.changeUserInfo(idUser, name);

                    if (userUpdated) {

                        const response = {
                            ok: true,
                            content: {
                                message: 'usuario actualizado',
                                user: userUpdated,
                            }
                        }

                        res.status(200).json(response);
                    } else {
                        next({
                            error: 'error en user info',
                            status: 500
                        });
                    }
                } catch (error) {
                    next(error);
                }

            })




    }

}

module.exports = route