const routeTodo = require('../../components/todo/todo.route');
const routeUser = require('../../components/users/user.route');
const config = require('../config/env');

var route = {
    init: (express, app) => {
        var router = express.Router();

        /* routes list */
        routeTodo.init(router)
        routeUser.init(router)


        /* prefix URL */
        const prefixApiUrl = config.app.urlApiPrefix; /* api/ */
        const prefixVersionApi = config.app.urlVersionPrefix; /* v1/ */

        const prefix = `${prefixApiUrl}${prefixVersionApi}`; /* api/v1/ */

        /* http://localhost:5000/v1/ */
        app.use(prefix, router);
    }
};

module.exports = route;