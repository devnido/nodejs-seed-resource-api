const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../../.env.testing') })

const { db, string, options } = require('../../app/framework/database/db.connect')

const expect = require('chai').expect

const Todo = require('../../app/components/todo/todo.model')
const todoRepository = require('../../app/components/todo/todo.repository')
const todoMock = require('../mocks/todo.mock')

const User = require('../../app/components/users/user.model')
const userMock = require('../mocks/user.mock')

const repository = todoRepository({ Todo })

describe('Testing Todo Repository with Mongodb - Integration Tests', function() {

    before('database connect', function(done) {

        db.connect(string, options)
            .then(() => done())
            .catch(e => done(e))

    })

    beforeEach('populate collections', function(done) {

        User.create(userMock)
            .then(result => {

                todoMock.user = result._id
                return Todo.create(todoMock)

            })
            .then(result => done())
            .catch(e => {
                console.log(e)
                done(e)
            })

    })

    it("Should return true if todo exists by id", function(done) {

        repository.existsById(todoMock._id)
            .then(result => {

                expect(result).equals(true)

                done()
            })
            .catch(e => {
                console.log(e)
                done(e)
            })
    })

    it("Should return false if todo does not exists by id", function(done) {

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

    it("Should return true if todo exists by name", function(done) {

        repository.existsByNameAndUser("write tests", "5e376c66ce68605aa0ed1141")
            .then(result => {

                expect(result).equal(true)

                done()
            })
            .catch(e => {
                console.log(e)
                done(e)
            })
    })

    it("Should return false if todo does not exists by name", function(done) {

        repository.existsByNameAndUser("new name", "5e376c66ce68605aa0ed1157")
            .then(result => {

                expect(result).equals(false)

                done()
            })
            .catch(e => {
                console.log(e)
                done(e)
            })
    })

    it("Should return false if name does not belong to another todo", function(done) {

        repository.existsByNameAndAnotherId("5e376c66ce68605aa0ed1141", "write test")
            .then(result => {

                expect(result).equals(false)

                done()
            })
            .catch(e => {
                done(e)
            })
    })

    it("Should return the total number of todo in collection by user", function(done) {

        repository.getTotal("5e376c66ce68605aa0ed1141")
            .then(result => {

                expect(result).equals(1)

                done()
            })
            .catch(e => {
                done(e)
            })
    })

    it("Should return list of paginated todo by user", function(done) {

        repository.getAllPaginated("5e376c66ce68605aa0ed1141", 10, 0)
            .then(result => {

                expect(result).to.be.an("Array")
                expect(result).to.be.lengthOf(1)

                done()
            })
            .catch(e => {
                done(e)
            })
    })

    it("Should a todo by id and user", function(done) {

        repository.getById("5e376c66ce68605aa0ed1141", "5e376c66ce68605aa0ed1157")
            .then(todo => {

                expect(todo).to.be.an("Object")
                expect(todo).to.be.include({ name: "write tests" })

                done()
            })
            .catch(e => {
                done(e)
            })
    })

    it("Should return a todo list if contains regex in the name", function(done) {

        const regex = new RegExp("ri", "i")

        repository.getByRegex(regex, "5e376c66ce68605aa0ed1141")
            .then(todo => {

                expect(todo).to.be.an("Array")
                expect(todo[0]).to.be.include({ name: "write tests" })

                done()
            })
            .catch(e => {
                done(e)
            })
    })

    it("Should return a todo list if contains regex in the status", function(done) {

        const regex = new RegExp("pend", "i")

        repository.getByRegex(regex, "5e376c66ce68605aa0ed1141")
            .then(todo => {

                expect(todo).to.be.an("Array")
                expect(todo[0]).to.be.include({ name: "write tests" })

                done()
            })
            .catch(e => {
                done(e)
            })
    })

    it("Should insert a todo in database", function(done) {

        const newTodo = {
            name: "testing",
            status: "pendiente",
            user: "5e376c66ce68605aa0ed1141"
        }

        repository.insert(newTodo)
            .then(todo => {

                expect(todo).to.be.an("Object")
                expect(todo).to.be.include({ name: "testing" })

                done()
            })
            .catch(e => {
                done(e)
            })
    })

    it("Should update status todo", function(done) {

        const todo = { id: "5e376c66ce68605aa0ed1157", name: "write tests", status: "realizado", user: "5e376c66ce68605aa0ed1141" }

        repository.update(todo)
            .then(updated => {

                expect(updated).to.be.an("Object")
                expect(updated).to.be.include({ status: "realizado" })

                done()
            })
            .catch(e => {
                done(e)
            })
    })

    it("Should delete a todo by id", function(done) {

        repository.delete("5e376c66ce68605aa0ed1157")
            .then(result => {

                expect(result).to.be.include({ n: 1, deletedCount: 1, ok: 1 })

                done()
            })
            .catch(e => {
                done(e)
            })
    })

    afterEach('clean articles collection', function(done) {

        Todo.deleteMany({})
            .then(result => User.deleteMany({}))
            .then(result => done())
            .catch(err => done(err))
    })

    after('database disconnect', function(done) {

        db.disconnect()
            .then(() => done())
            .catch(err => done(err))
    })

})