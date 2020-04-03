const middleware = ({ jwtService }) => ({
    isLoggedIn: async(req, res, next) => {

        try {

            const { authorization } = req.headers

            const { idUser } = await jwtService.verifyAndDecode(authorization)

            req.uid = idUser

            next()

        } catch (error) {
            if (error.name = 'TokenExpiredError') {
                next({
                    error: error,
                    status: 440
                })
            } else {
                next({
                    error: error,
                    status: 401
                })
            }
        }

    }
})

module.exports = middleware