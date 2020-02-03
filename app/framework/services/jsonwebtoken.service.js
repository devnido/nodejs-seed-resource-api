const jsonwebtoken = require('jsonwebtoken');
const config = require('../config/env');

const service = {
    verifyAndDecode: (bearer) => new Promise((resolve, reject) => {

        const token = bearer.split(' ')[1];

        const secret = config.app.secretApi;

        const decoded = jsonwebtoken.verify(token, secret);

        if (decoded) {

            resolve({ idUser: decoded.uid })

        } else {

            reject({ name: 'undecoded jwt from client', status: 401 })

        }
    })
};

module.exports = service;