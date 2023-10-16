const { UserTypes } = require('../db');
const {Op} = require('sequelize');

const userTypeServices = {
    allUserTypes: async function () {
        try{
            const userTypes = await UserTypes.findAll()
            return userTypes
        } catch (error) {
            return error
        }
    },
    createUserType: async function (userTypeData) {
        try {
            const { name, createProject, editProject, manageUsers, managePayments } = userTypeData
            if (!name || !createProject || !editProject || !manageUsers || !managePayments) {
                throw Error(`Missing some data`);
            } else {
                const newUserType = await UserTypes.create({ name, createProject, editProject, manageUsers, managePayments})
                if (newUserType) return newUserType
            }
        } catch (error) {
            return error
        }
    },
    updateUserType: async function (userTypeData){
        try {
            const {id, name, createProject, editProject, manageUsers, managePayments } = userTypeData
            const updated = await UserTypes.update(userTypeData, {where: {id: id}})
            if (updated) {
                const response = await UserTypes.findByPk(id)
                res.status(200).json(response)
            }
        } catch (error) {
            return error
        }
    },
}

module.exports = userTypeServices