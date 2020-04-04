const repository = ({ User }) => ({

    existsById: id => User.exists({ _id: id }),

    findByIdWithPassword: id => User.findById(id, { name: 1, email: 1, password: 1, status: 1 }),

    setNewPassword: (idUser, password) => User.updateOne({ _id: idUser }, { password }),

    setNewInfo: (idUser, name) => User.findOneAndUpdate({ _id: idUser }, { name }, { new: true })

})

module.exports = repository