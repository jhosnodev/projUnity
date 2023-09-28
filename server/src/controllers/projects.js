const Services = require('../services').ProjectServices;

const projectControllers = {
    getProjects: async function (req,res) {
        try {
            const {name} = req.query
            const allProjects = await Services.allProjects(name)
            res.status(200).json(allProjects)
        } catch (error){
            res.status(500).json(error.message)
        }
    },
    getProjectsID: async function () {
        
    }

}

module.exports = projectControllers