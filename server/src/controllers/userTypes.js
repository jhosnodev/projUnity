const Service = require('../services').userTypeServices;

const userTypeControllers = {
    getUserTypes: async function (req,res) {
        try {
            const UserTypes = await Service.allUserTypes()
            res.send(200).json(UserTypes)
        } catch (error) {
            res.send(500).json(error.message)
        }
    },
    postUserType: async function (req,res) {
        try {
            const { name, createProject, editProject, manageUsers, managePayments } = req.body
            const newUserType = await Service.createUserType(req.body)
            if (newUserType) {
                res.send(200).json(newUserType)
            }
        } catch (error) {
            res.send(500).json(error.message)
        }
    }
}

module.exports = userTypeControllers