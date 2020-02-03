const errorHandler = require('../../framework/middlewares/error-handler.middleware');
const todoRepository = require('./todo.reposiroty');

const {
    body,
    query,
    param,
    validationResult
} = require('express-validator');


const {
    sanitizeBody,
    sanitizeQuery
} = require('express-validator');

const validator = {

    getAll: [
        sanitizeQuery('*').trim().blacklist('\\<\\>\\?'),
        sanitizeQuery('page').toInt(),

        query('page')
            .exists({
                checkFalsy: true
            }).withMessage('Page number is required')
            .isInt({
                min: 1,
                max: 10
            }).withMessage('Page number must be an integer between 1 and 10'),


        errorHandler.validation(validationResult)
    ],
    add: [
        sanitizeBody('*').trim().blacklist('\\<\\>\\?'),
        body('name')
            .exists({
                checkFalsy: true
            }).withMessage('Name is required')
            .isLength({
                min: 2,
                max: 50
            }).withMessage('Must have between 2 and 50 characters')
            .matches('^[a-zA-Z0-9][a-zA-Z\\s\\d]*$').withMessage('can only contain numbers and letters')
            .custom((name) => {
                return todoRepository.existsByName(name)
                    .then(todo => {
                        if (todo) {
                            return Promise.reject('Todo already exists')
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        throw new Error('Ha ocurrido un error en la validacion');
                    })
            }).withMessage('Todo already exists'),

        errorHandler.validation(validationResult)

    ],
    update: [
        sanitizeBody('*').trim().blacklist('\\<\\>\\?'),
        param('id')
            .exists({
                checkFalsy: true
            }).withMessage('Todo id doesnt exists')
            .isMongoId().withMessage('Todo ID is incorrect')
            .custom((id) => {
                return todoRepository.existsById(id)
                    .then(todo => {
                        if (todo) {

                        } else {
                            return Promise.reject('Todo doesnt exists')
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        throw new Error('Ha ocurrido un error en la validacion');
                    })
            }).withMessage('Todo doesnt exists'),

        body('status')
            .exists({
                checkFalsy: true
            }).withMessage('Status is required')
            .isIn(['pending', 'finalized']).withMessage('Status is not valid'),

        errorHandler.validation(validationResult)
    ],
    delete: [
        sanitizeBody('*').trim().blacklist('\\<\\>\\?'),
        param('id')
            .exists({
                checkFalsy: true
            }).withMessage('Todo id doesnt exists')
            .isMongoId().withMessage('Todo ID is incorrect')
            .custom((id) => {
                return todoRepository.existsById(id)
                    .then(todo => {
                        if (todo) {

                        } else {
                            return Promise.reject('Todo doesnt exists')
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        throw new Error('Ha ocurrido un error en la validacion');
                    })
            }).withMessage('Todo doesnt exists'),

        errorHandler.validation(validationResult)
    ]

};

module.exports = validator;