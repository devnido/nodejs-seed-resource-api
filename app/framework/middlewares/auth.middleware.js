const jwtService = require('../services/jsonwebtoken.service');

const middleware = {
    isLoggedIn: async (req, res, next) => {

        try {

            const bearer = req.headers['authorization'];

            const { idUser } = await jwtService.verifyAndDecode(bearer);

            req.uid = idUser;

            next();

        } catch (error) {
            if (err.name = 'TokenExpiredError') {
                next({
                    error: err,
                    status: 440
                })
            } else {
                next({
                    error: err,
                    status: 401
                })
            }
        }

    }
}

module.exports = middleware;
