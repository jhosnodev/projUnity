const Service = require('../services').userServices;

const userControllers = {
    getUsers: async function (req,res) {
        try {
            const { name } = req.query
            const Users = await Service.allUsers(name)
            res.send(200).json(Users)
        } catch (error) {
            res.send(500).json(error.message)
        }
    },
    postUser: async function (req,res) {
        try {
            const Users = await Service.createUser()
            res.send(200).json(Users)
        } catch (error) {
            res.send(500).json(error.message)
        }
    }
}

module.exports = userControllers