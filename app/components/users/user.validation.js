const errorHandler = require('../../framework/middlewares/error-handler.middleware');
const userRepository = require('../users/user.repository');
const userController = require('../users/user.controller');

const { check, body, param, validationResult } = require('express-validator');


const validator = {

    changePassword: [
        check(['idUser', 'currentPassword', 'newPassword', 'confirmNewPassword']).trim(),

        param('idUser')
        .exists({
            checkFalsy: true
        }).withMessage('El id de usuario es obligatorio')
        .isMongoId().withMessage('el id del usuario debe ser válido')
        .custom((idUser) => {
            return userRepository.existsById(idUser)
                .then(result => {
                    if (result) {

                    } else {
                        return Promise.reject('El usuario no existe')
                    }
                })
                .catch(err => {

                    throw new Error('El usuario no existe');
                })
        }),

        body('currentPassword')
        .exists({
            checkFalsy: true
        }).withMessage('La contraseña actual es obligatoria')
        .isLength({
            min: 6
        }).withMessage('Debe contener como minimo 6 caracteres')
        .custom((currentPassword, { req }) => {
            return userController.validateCurrentPassword(req.params.idUser, currentPassword)
                .then(result => {
                    if (result) {

                    } else {
                        return Promise.reject('La contraseña actual es incorrecta')
                    }
                })
                .catch(err => {

                    throw new Error('La contraseña actual es incorrecta');
                })
        }),


        body('newPassword')
        .exists({
            checkFalsy: true
        }).withMessage('La nueva contraseña es obligatoria')
        .isLength({
            min: 6
        }).withMessage('Debe contener como minimo 6 caracteres')
        .custom((value, { req }) => {
            if (value !== req.body.confirmNewPassword) {
                // trow error if passwords do not match
                throw new Error("Nueva contraseña y Confirmar contraseña deben ser iguales");
            } else {
                return value;
            }
        }),
        errorHandler.validation(validationResult)


    ],
    changeUserInfo: [
        check(['idUser', 'name']).trim(),

        param('idUser')
        .exists({
            checkFalsy: true
        }).withMessage('El id de usuario es obligatorio')
        .isMongoId().withMessage('el id del usuario debe ser válido')
        .custom((idUser) => {
            return userRepository.existsById(idUser)
                .then(result => {
                    if (result) {

                    } else {
                        return Promise.reject('El usuario no existe')
                    }
                })
                .catch(err => {

                    throw new Error('El usuario no existe');
                })
        }),

        body('name')
        .exists({
            checkFalsy: true
        }).withMessage('El nombre es obligatorio')
        .isLength({
            min: 2,
            max: 50
        }).withMessage('Debe contener entre 2 y 50 caracteres')
        .matches('^[a-zA-Z0-9][a-zA-Z\\s\\d]*$').withMessage('El nombre solo puede contener letras y números'),

        errorHandler.validation(validationResult)


    ],

}

module.exports = validator;