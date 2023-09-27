const { allUsers, createUser} = require('../services');

async function getUsers(req,res) {
    try {
        const Users = await allUsers()
        res.send(200).json(Users)
    } catch (error) {
        res.send(500).json(error.message)
    }
}

async function postUser(req,res) {
    try {
        const Users = await createUser()
        res.send(200).json(Users)
    } catch (error) {
        res.send(500).json(error.message)
    }
}

module.exports = {
    getUsers, postUser
}