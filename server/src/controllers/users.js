const { allUsers, createUser} = require('../services');

const userControllers = {
    getUsers: async function (req,res) {
        try {
            const Users = await allUsers()
            res.send(200).json(Users)
        } catch (error) {
            res.send(500).json(error.message)
        }
    },
    postUser: async function (req,res) {
        try {
            const Users = await createUser()
            res.send(200).json(Users)
        } catch (error) {
            res.send(500).json(error.message)
        }
    }
}

module.exports = userControllers