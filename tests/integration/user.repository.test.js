const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../../.env.testing') })

const { db, string, options } = require('../../app/framework/database/db.connect')

const expect = require('chai').expect

const User = require('../../app/components/users/user.model')
const userRepository = require('../../app/components/users/user.repository')
const userMock = require('../mocks/user.mock')

const repository = userRepository({ User })

describe('Testing User Repository with Mongodb - Integration Tests', function () {

    before('database connect', function (done) {

        db.connect(string, options)
            .then(() => done())
            .catch(e => done(e))

    })

    beforeEach('populate collections', function (done) {

        User.create(userMock)
            .then(result => done())
            .catch(e => {
                console.log(e)
                done(e)
            })

    })

    it("Should return true if todo exists by id", function (done) {

        repository.existsById("5e376c66ce68605aa0ed1141")
            .then(result => {

                expect(result).equals(true)

                done()
            })
            .catch(e => {
                console.log(e)
                done(e)
            })
    })

    it("Should return false if user does not exists by id", function (done) {

        repository.existsById("5e376c66ce68605aa0ed1148")
            .then(result => {

                expect(result).equals(false)

                done()
            })
            .catch(e => {
                console.log(e)
                done(e)
            })
    })

    it("Should a user that include password field", function (done) {

        repository.findByIdWithPassword("5e376c66ce68605aa0ed1141")
            .then(user => {

                expect(user).to.be.an("Object")
                expect(user).to.be.include({ password: "$2a$08$uidjedT8ZH.HAd1lH/3OGOThptUBAHYFWDI5SfMKs7EeTtBQ/BW96" })

                done()
            })
            .catch(e => {
                console.log(e)
                done(e)
            })
    })

    it("Should modify the user setting new password", function (done) {

        repository.setNewPassword("5e376c66ce68605aa0ed1141", "newpassword")
            .then(result => {

                expect(result).to.be.an("Object")
                expect(result).to.be.include({ n: 1, nModified: 1, ok: 1 })

                done()
            })
            .catch(e => {
                console.log(e)
                done(e)
            })
    })

    it("Should modify the user setting new name", function (done) {

        repository.setNewInfo("5e376c66ce68605aa0ed1141", "newname")
            .then(result => {

                expect(result).to.be.an("Object")
                expect(result).to.be.include({ name: "newname" })

                done()
            })
            .catch(e => {
                console.log(e)
                done(e)
            })
    })

    afterEach('clean articles collection', function (done) {

        User.deleteMany({})
            .then(result => done())
            .catch(err => done(err))
    })

    after('database disconnect', function (done) {

        db.disconnect()
            .then(() => done())
            .catch(err => done(err))
    })

})