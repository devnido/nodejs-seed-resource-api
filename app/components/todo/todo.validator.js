const errorHandler = require('../../framework/middlewares/error-handler.middleware');
const todoRepository = require('./todo.reposiroty');

const { check, query, body, param, validationResult } = require('express-validator');

const validator = {

    getAllPaginated: [

        check(['page']).trim().escape().toInt(),

        query('page')
        .exists({
            checkFalsy: true
        }).withMessage('El numero de pagina es obligatorio')
        .isInt({
            min: 1,
            max: 10
        }).withMessage('El numero de pagina debe ser entre 1 y 10'),

        errorHandler.validation(validationResult)
    ],
    get: [
        check(['idTodo']).trim().escape(),

        param('idTodo')
        .exists({
            checkFalsy: true
        }).withMessage('El id es obligatorio')
        .isMongoId().withMessage('El id es incorrecto')
        .custom((idTodo) => {
            return todoRepository.existsById(idTodo)
                .then(todo => {
                    if (todo) {

                    } else {
                        return Promise.reject('El id no existe')
                    }
                })
                .catch(err => {
                    console.log(err)
                    throw new Error('El id no existe')
                })
        }).withMessage('El id no existe'),

        errorHandler.validation(validationResult)
    ],
    add: [
        check(['name']).trim().escape(),

        body('name')
        .exists({
            checkFalsy: true
        }).withMessage('El nombre es obligatorio')
        .isLength({
            min: 2,
            max: 50
        }).withMessage('Debe tener entre 2 y 50 caracteres')
        .custom((name) => {
            return todoRepository.existsByName(name)
                .then(todo => {
                    if (todo) {
                        return Promise.reject('El nombre ya existe')
                    }
                })
                .catch(err => {
                    console.log(err)
                    throw new Error('El nombre ya existe')
                })
        }).withMessage('El nombre ya existe'),

        errorHandler.validation(validationResult)

    ],
    search: [

        check(['q']).trim().escape(),

        // ********* //
        //  user id  //
        // ********* //
        param('q')
        .exists({
            checkFalsy: true
        }).withMessage('La palabra a buscar es obligatoria'),
        errorHandler.validation(validationResult)
    ],
    update: [
        check(['idTodo', 'status']).trim().escape(),

        param('idTodo')
        .exists({
            checkFalsy: true
        }).withMessage('El id es obligatorio')
        .isMongoId().withMessage('El id es incorrecto')
        .custom((idTodo) => {
            return todoRepository.existsById(idTodo)
                .then(todo => {
                    if (todo) {

                    } else {
                        return Promise.reject('El id no existe')
                    }
                })
                .catch(err => {
                    console.log(err)
                    throw new Error('El id no existe')
                })
        }).withMessage('El id no existe'),

        body('name')
        .exists({
            checkFalsy: true
        }).withMessage('El nombre es obligatorio')
        .isLength({
            min: 2,
            max: 50
        }).withMessage('Debe tener entre 2 y 50 caracteres')
        .custom((name, { req }) => {
            return todoRepository.existsByNameAndAnotherId(req.params.idTodo, name)
                .then(todo => {
                    if (todo) {
                        return Promise.reject('El nombre ya existe')
                    }
                })
                .catch(err => {
                    console.log(err)
                    throw new Error('El nombre ya existe')
                })
        }).withMessage('El nombre ya existe'),

        body('status')
        .exists({
            checkFalsy: true
        }).withMessage('El estado es obligatorio')
        .isIn(['pendiente', 'realizado']).withMessage('Status is not valid'),

        errorHandler.validation(validationResult)
    ],
    delete: [
        check(['idTodo']).trim().escape(),

        param('idTodo')
        .exists({
            checkFalsy: true
        }).withMessage('El id es obligatorio')
        .isMongoId().withMessage('El id es incorrecto')
        .custom((idTodo) => {
            return todoRepository.existsById(idTodo)
                .then(todo => {
                    if (todo) {

                    } else {
                        return Promise.reject('El id no existe')
                    }
                })
                .catch(err => {
                    console.log(err)
                    throw new Error('El id no existe')
                })
        }).withMessage('El id no existe'),

        errorHandler.validation(validationResult)
    ]

};

module.exports = validator;