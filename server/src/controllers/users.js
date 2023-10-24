const Service = require('../services').userServices;
const { sendEmail } = require('./mailer');

const userControllers = {
    getUsers: async function (req,res) {
        try {
            const { name } = req.query
            const Users = await Service.allUsers(name)
            res.status(200).json(Users)
        } catch (error) {
            res.status(500).json(error.message)
        }
    },
    postUser: async function (req,res) {
        try {
            const Users = await Service.createUser(req.body)
            const userMail = Users.email
            const subject = "Usuario creado con éxito ✔";
            const text = `Hola ${Users.name}, te damos la bienvenida a PROJUNITY!.`;
            const html = "<b>Bievenido a la comunidad de PROJUNITY!</b>"
            sendEmail(userMail, subject, text, html)

            res.status(200).json(Users)
        } catch (error) {
            res.status(500).json(error.message)
        }
    },

    deleteUser: async function (req, res) {
        try {
          const userId = req.params.id;
    
          const result = await Service.deleteUser(userId);
    
          res.status(200).json(result);
        } catch (error) {
          res.status(500).json(error.message);
        }
      },
  
      restoreUser : async function (req, res) {
        try{
          const userId = req.params.id;
          const result = await Service.restoreUsers(userId);
          res.status(200).json(result);
        }catch(error){
          res.status(500).json(error.message);
        }
      }
}

module.exports = userControllers