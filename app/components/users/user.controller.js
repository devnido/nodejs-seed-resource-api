const service = ({ userRepository, passwordService }) => ({

    validateCurrentPassword: async(idUser, password) => {

        const user = await userRepository.findByIdWithPassword(idUser)

        const passwordHash = passwordService.hashPassword(password)

        const result = passwordService.comparePassword(password, user.password)

        return result

    },
    changePassword: (idUser, password) => {

        const passwordHash = passwordService.hashPassword(password)

        return userRepository.setNewPassword(idUser, passwordHash)

    },
    changeUserInfo: async(idUser, name) => {

        let user = await userRepository.setNewInfo(idUser, name)

        user = user.toObject()

        delete user.password

        return user

    }


})

module.exports = service