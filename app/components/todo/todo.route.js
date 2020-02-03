const todoController = require("./todo.controller");
const todoValidator = require("./todo.validator");
const authMiddleware = require("../../framework/middlewares/auth.middleware");

const route = {
	init: router => {

		//route /todo - GET
		router.route('/todo').get(async (req, res, next) => {
			try {

				const {
					page
				} = req.query;

				const todoList = await todoController.getTodoList(page);

				const response = {
					ok: true,
					content: {
						message: 'Todo List ',
						todoList: todoList
					}
				}

				res.status(200).json(response);

			} catch (error) {

				next({
					error: error,
					status: 500
				});

			}
		});//end route /todo - GET


		//route /todo - POST
		router.route('/todo').post(async (req, res, next) => {

			const {
				name
			} = req.body;

			try {

				const addedTodo = await todoController.addTodo(name);

				const response = {
					ok: true,
					content: {
						message: 'Todo added successful',
						todo: addedTodo
					}
				}

				res.status(200).json(response);

			} catch (error) {
				next({
					error: error,
					status: 500
				})
			}


		});//end route /todo - POST


		//route /todo - PUT
		router.route('/todo/:id').put(async (req, res, next) => {

			const {
				id
			} = req.params;

			const {
				status
			} = req.body;

			try {

				const updatedTodo = await todoController.updateTodo(id, status);

				const response = {
					ok: true,
					content: {
						message: 'Todo updated successful',
						todo: updatedTodo
					}
				}

				res.status(200).json(response);

			} catch (error) {
				next({
					error: error,
					status: 500
				})
			}


		});//end route /todo - PUT


		//route /todo - DELETE
		router.route('/todo/:id').delete(async (req, res, next) => {

			const {
				id
			} = req.params;

			try {

				const deleted = await todoController.deleteTodo(id);

				const response = {
					ok: true,
					content: {
						message: 'Todo deleted successful',
						status: deleted
					}
				}

				res.status(200).json(response);

			} catch (error) {
				next({
					error: error,
					status: 500
				})
			}


		});//end route /todo - PUT


	}
};

module.exports = route;