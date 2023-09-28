const {Users} = require('../db');

const userServices = {
    allUsers: async function () {
        try{
            const Users = await Users.findAll()
            return Users
        } catch (error) {
            return error
        }
    },
    createUser: async function (userData) {
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
    },
    updateUser: async function (userData){
        try {
            const { id, name, email, password, image, twitterUser, emailUser, githubUser, roleId} = userData
            const updated = await Users.update(userData, {where: {id: id}})
            if (updated) {
                const response = await Users.findByPk(id)
                res.status(200).json(response)
            }
        } catch (error) {
            return error
        }
    },
    deleteUser: async function (id) {
        try {
            const User = await Users.findByPk(id)
            if (User) {
                await User.destroy()
            }
            res.status(200).json(movimCaja)
        } catch (error) {
            return error
        }
    }
}

module.exports = userServices