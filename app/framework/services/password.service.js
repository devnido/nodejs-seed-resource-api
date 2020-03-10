const bcrypt = require('bcryptjs');
const config = require('../config/env');

const service = {

    generateNewPassword: () => Math.random().toString(36).slice(-8),

    comparePassword: (passwordUser, passwordDB) => {

        return bcrypt.compareSync(passwordUser, passwordDB);


    },

    hashPassword: (password) => {

        const salt = parseInt(config.app.passwordSalt)

        return bcrypt.hashSync(password, salt)

    }


};

module.exports = service;