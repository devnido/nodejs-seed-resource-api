const expect = require('chai').expect
const sinon = require('sinon')

const todoMock = require('../mocks/todo.mock')
const todosMock = require('../mocks/todos.mock')

const todoController = require('../../app/components/todo/todo.controller')

let todoRepository = {}
let todo = {}
let todos = {}
let controller = {}
let config = {}

describe('Testing Todo Controller - Unit Tests', () => {

    beforeEach('Prepare functions', function() {

        todo = {...todoMock }
        todos = [...todosMock]

        config = {
            app: {
                todoPerPage: 10
            }
        }

        todoRepository = {
            existsById: sinon.stub().withArgs("5e376c66ce68605aa0ed1157").resolves(true),
            existsByNameAndUser: sinon.stub().withArgs("write tests", "5e376c66ce68605aa0ed1141").resolves(todo),
            existsByNameAndAnotherId: sinon.stub().withArgs("5e376c66ce68605aa0ed13243", "write tests").resolves(false),
            getTotal: sinon.stub().withArgs("5e376c66ce68605aa0ed1141").resolves(10),
            getAllPaginated: sinon.stub().withArgs("5e376c66ce68605aa0ed1141", 10, 0).resolves(todos),
            getById: sinon.stub().withArgs("5e376c66ce68605aa0ed1157").resolves(todo),
            getByRegex: sinon.stub().resolves(todos),
            insert: sinon.stub().withArgs("write tests", "pendiente", "5e376c66ce68605aa0ed1141").resolves({...todo, createdAt: Date.now(), modifiedAt: Date.now() }),
            update: sinon.stub().withArgs("5e376c66ce68605aa0ed1149", "write tests", "realizado", "5e376c66ce68605aa0ed1141").resolves({ n: 1, nModified: 1, ok: 1 }),
            delete: sinon.stub().withArgs("5e376c66ce68605aa0ed1149", "123456").resolves({ n: 1, deletedCount: 1, ok: 1 })
        }


        controller = todoController({ config, todoRepository })

    })

    it('Should return a list of todo', function(done) {

        controller.getAllPaginated(1, "5e376c66ce68605aa0ed1141")
            .then(result => {

                const { todos, nextPage, total } = result

                expect(todos).to.be.lengthOf(10)
                expect(nextPage).to.be.equal(2)
                expect(total).to.be.equal(10)

                done()
            })
            .catch(e => {
                done(e)
            })

    })

    it('Should return a todo', function(done) {

        controller.get("5e376c66ce68605aa0ed1141", "5e376c66ce68605aa0ed1157")
            .then(todoResult => {

                expect(todoResult).to.be.an('Object')
                expect(todoResult).to.be.include({
                    _id: "5e376c66ce68605aa0ed1157",
                    name: "write tests",
                    status: "pendiente"
                })

                done()
            })
            .catch(e => done(e))


    })

    it('Should add a todo', function(done) {

        controller.get("5e376c66ce68605aa0ed1141", "write tests")
            .then(todo => {

                expect(todo).to.be.an('Object')
                expect(todo).to.be.include({
                    _id: "5e376c66ce68605aa0ed1157",
                    name: "write tests",
                    status: "pendiente"
                })

                done()
            })
            .catch(e => done(e))


    })

    it('Should modify a todo', function(done) {

        controller.edit("5e376c66ce68605aa0ed1157", "write tests", "realizado", "5e376c66ce68605aa0ed1141")
            .then(result => {

                expect(result).to.be.include({ n: 1, nModified: 1, ok: 1 })

                done()
            })
            .catch(e => done(e))


    })

    it('Should delete a todo', function(done) {

        controller.delete("5e376c66ce68605aa0ed1157")
            .then(result => {

                expect(result).to.be.include({ n: 1, deletedCount: 1, ok: 1 })

                done()
            })
            .catch(e => done(e))


    })




    afterEach('Clean functions', function() {
        todoRepository = {}
        todo = {}
        todos = {}
        users = {}
        controller = {}
        config = {}
    })

})