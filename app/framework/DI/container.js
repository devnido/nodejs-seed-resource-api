const { createContainer, asFunction, asValue } = require('awilix')

const Todo = require('../../components/todo/todo.model')
const todoRepository = require('../../components/todo/todo.repository')
const todoController = require('../../components/todo/todo.controller')
const todoRoute = require('../../components/todo/todo.route')
const todoValidator = require('../../components/todo/todo.validator')


const User = require('../../components/users/user.model')
const userRepository = require('../../components/users/user.repository')
const userController = require('../../components/users/user.controller')
const userRoute = require('../../components/users/user.route')
const userValidator = require('../../components/users/user.validator')

const jwtService = require('../services/jsonwebtoken.service')
const passwordService = require('../services/password.service')

const authMiddleware = require('../middlewares/auth.middleware')

const config = require('../config/env')
const errorHandler = require('../middlewares/error-handler.middleware')
const routes = require('../routes/main.route')


const container = createContainer()

container
    .register({
        config: asValue(config),
        errorHandler: asValue(errorHandler),
        routes: asFunction(routes).singleton()
    })
    .register({
        todoRepository: asFunction(todoRepository).singleton(),
        todoController: asFunction(todoController).singleton(),
        todoRoute: asFunction(todoRoute).singleton(),
        todoValidator: asFunction(todoValidator).singleton()
    })
    .register({
        userRepository: asFunction(userRepository).singleton(),
        userController: asFunction(userController).singleton(),
        userRoute: asFunction(userRoute).singleton(),
        userValidator: asFunction(userValidator).singleton()
    })
    .register({
        jwtService: asFunction(jwtService).singleton(),
        passwordService: asFunction(passwordService).singleton()
    })
    .register({
        authMiddleware: asFunction(authMiddleware).singleton()
    })
    .register({
        Todo: asValue(Todo),
        User: asValue(User),
    })


module.exports = container