const { allUserTypes, createUserType} = require('../services');

async function getUserTypes(req,res) {
    try {
        const UserTypes = await allUserTypes()
        res.send(200).json(UserTypes)
    } catch (error) {
        res.send(500).json(error.message)
    }
}

async function postUserType(req,res) {
    try {
        const { name, createProject, editProject, manageUsers, managePayments } = req.body
        const newUserType = await createUserType(req.body)
        if (newUserType) {
            res.send(200).json(newUserType)
        }
    } catch (error) {
        res.send(500).json(error.message)
    }
}

module.exports = {
    getUsers, postUser
}