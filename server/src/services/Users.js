const { Users, UserTypes } = require('../db');
const {Op} = require('sequelize');

const userServices = {
    allUsers: async function (name) {
        try{
            if (name) {
                const response = await Users.findAll({
                    where: 
                        {name: { [Op.like]: `%${name}%`},
                    [Op.or]: [ 
                        {name: {[Op.like]: `${name}%`}},
                    ]}
                })
                return Users
            } else {
                const response = await Users.findAll()
                return response
            }
        } catch (error) {
            return error
        }
    },
    createUser: async function (userData) {
        try {
            const { name, email, password, image, twitterUser, emailUser, githubUser, role} = userData
            if ( !name || !email || !password || !image || !twitterUser || !emailUser || !githubUser || !role) {
                throw Error(`Missing some data`)
            } else {
                const [newUser, created] = await Users.findOrCreate({
                    where: {email: email},
                    defaults: {...userData}
                })
                if (created) {
                    return newUser
                } else {
                    throw Error('El email de usuario ya existe')
                }
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
    },
    bulkUsers: async function (usersData) {
        try{
            const bulk = await Users.bulkCreate(usersData)
            return bulk
        } catch (error) {
            return console.log(error)
        }
    }
}

module.exports = userServices