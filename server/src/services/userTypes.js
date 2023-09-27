const {UserTypes} = require('../db');

async function allUserTypes() {
    try{
        const userTypes = await UserTypes.findAll()
        return userTypes
    } catch (error) {
        return error
    }
}

async function createUserType(userTypeData) {
    try {
        const { name, createProject, editProject, manageUsers, managePayments } = userTypeData
        let flag = false;
        for (const prop in userTypeData) {
            let count = 0;
            if(!userTypeData[prop]) throw Error('Missing userType data');
            count === Object.keys(userTypeData).length? flag = true : count += 1;
        }
        if (flag) {
            const newUserType = await UserTypes.create({ name, createProject, editProject, manageUsers, managePayments})
            if (newUserType) return newUserType
        }
    } catch (error) {
        return error
    }
}

async function updateUserType(userTypeData){
    try {
        const { name, createProject, editProject, manageUsers, managePayments } = userTypeData
        
    } catch (error) {
        return error
    }
}

module.exports = { allUserTypes, createUserType, updateUserType }