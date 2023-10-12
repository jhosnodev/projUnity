const Service = require('../services').userServices;

const userControllers = {
    getUsers: async function (req,res) {
        try {
            const { name } = req.query
            const { id } = req.params
            const Users = await Service.allUsers({name, id})
            res.status(200).json(Users)
        } catch (error) {
            res.status(500).json(error.message)
        }
    },
    postUser: async function (req,res) {
        try {
            const Users = await Service.createUser(req.body)
            res.status(200).json(Users)
        } catch (error) {
            res.status(500).json(error.message)
        }
    }
}

module.exports = userControllers