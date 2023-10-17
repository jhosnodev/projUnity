const { Users, UserTypes } = require('../db');
const {Op} = require('sequelize');
var pbkdf2 = require('pbkdf2');
var salt = process.env.SALT_KEY;

function encryptionPassword(password) {
    var key = pbkdf2.pbkdf2Sync(
        password, salt, 36000, 64, 'sha256'
    );
    var hash = key.toString('hex');
    return hash;
}


const userServices = {
    allUsers: async function (name) {
        try{
            if (name) {
                const response = await Users.findAll({
                    where: 
                        {name: { [Op.iLike]: `%${name}%`},
                    [Op.or]: [ 
                        {name: {[Op.iLike]: `${name}%`}},
                    ],
                    [Op.and]: [{active: 'true'}]},
                    attributes: ['name','email', 'image', 'twitterUser','emailUser','githubUser','role']
                })
                return response
            } else {
                const response = await Users.findAll({
                    where: {active: 'true'},
                    attributes: ['name','email', 'image', 'twitterUser','emailUser','githubUser','role']
                })
                return response
            }
        } catch (error) {
            return error
        }
    },
    createUser: async function (userData) {
        try {
            const { name, email, password, image, twitterUser, emailUser, githubUser, role} = userData

            if ( !name || !email || !password /* || !image || !twitterUser || !emailUser || !githubUser <<== MODIFIQUE ESTO PARA PODER CREAR USUARIOS */ || !role) {

                throw Error(`Missing some data`)
            } else {
                const [newUser, created] = await Users.findOrCreate({
                    where: {email: email},
                    defaults: {
                        name,
                        password: encryptionPassword(password),
                        image,
                        twitterUser,
                        emailUser,
                        githubUser,
                        role
                    }
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
}

module.exports = userServices