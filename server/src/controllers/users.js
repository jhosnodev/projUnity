const Service = require('../services').userServices;

const userControllers = {
    getUsers: async function (req,res) {
        try {
            const { name, deleted } = req.query
            const Users = await Service.allUsers({name, deleted})
            res.status(200).json(Users)
        } catch (error) {
            res.status(500).json(error.message)
        }
    },
    getUserById: async function(req,res) {
      try {
        const {id} = req.params;
        const User = await Service.userById(id)
        if (User) {
          res.status(200).json(User)
        }
      } catch (error) {
        res.status(500).json(error.message)
      }
    },
    postUser: async function (req,res) {
        try {
            const Users = await Service.createUser(req.body)
            if (Users.id) {

              const subject = "Usuario creado con éxito ✔ 😉";
              const text = `Querido ${Users.name} Tu proyecto se ha creado con éxito. Felicitaciones y gracias por hacer de nuestra comunidad un lugar mejor! `
              const html = `<p>
              <strong>Querido ${Users.name}</strong>
              </p>

              <p>Muchas gracias por formar parte de nuestra comunidad. Esperamos que disfrutes de tu experiencia en nuestro sitio.</p>
              <p>Te recordamos que podés ingresar a tu cuenta con tu email y la contraseña que elegiste al registrarte.</p>
              <p>¡Te esperamos pronto!</p>
              <p>Saludos,</p>
              <br/>
              <p>El equipo de ProJunity</p>
              <p>@2023 ProJunity. Todos los derechos reservados.</p>
              `
              sendEmail(userMail, subject, text, html)

              res.status(201).json(Users);
            } else {
              res.status(400).json({ type: "error", response: "Algo falló" });
            }
            console.log(Users)
        } catch (error) {
            res.status(500).json(error.message)
        }
    },

    deleteUser: async function (req, res) {
        try {
          const userId = req.params.id;
    
          const result = await Service.deleteUserbyId(userId);
    
          res.status(200).json(result);
        } catch (error) {
          res.status(500).json(error.message);
        }
      },
  
      restoreUser : async function (req, res) {
        try{
          const {id} = req.params;
          const result = await Service.restoreUsers(id);
          res.status(200).json(result);
        }catch(error){
          res.status(500).json(error.message);
        }
      }
}

module.exports = userControllers
