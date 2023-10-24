const Service = require('../services').userServices;

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