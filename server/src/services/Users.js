const {Users} = require('../db');

async function allUsers() {
    try{
        const Users = await Users.findAll()
        return Users
    } catch (error) {
        return error
    }
}

async function createUser(userData) {
    try {
        const { id, name, email, password, image, twitterUser, emailUser, githubUser, roleId} = userData
        let flag = false;
        for (const prop in userData) {
            let count = 0;
            if(!userData[prop]) throw Error('Missing user data');
            count === Object.keys(userData).length? flag = true : count += 1;
        }
        if (flag) {
            const newUser = await Users.create({id, name, email, password, image, twitterUser, emailUser, githubUser, roleId})
            if (newUser) return newUser
        }
    } catch (error){
        return error
    }
}

async function updateUser(userData){
    try {
        const { id, name, email, password, image, twitterUser, emailUser, githubUser, roleId} = userData
        
    } catch (error) {
        return error
    }
}

module.exports = { allUsers, createUser, updateUser }