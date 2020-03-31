const route = ({ config, todoRoute, userRoute }) => ({
    init: (express, app) => {
        const router = express.Router()

        /* routes list */
        todoRoute.init(router)
        userRoute.init(router)


        /* prefix URL */
        const prefixApiUrl = config.app.urlApiPrefix /* api/ */
        const prefixVersionApi = config.app.urlVersionPrefix /* v1/ */

        const prefix = `${prefixApiUrl}${prefixVersionApi}` /* api/v1/ */

        /* http://localhost:5000/v1/ */
        app.use(prefix, router)
    }
})

module.exports = route