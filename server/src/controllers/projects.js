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
    getProjectsID: async function (req,res) {
        try {
            const {id} = req.params
            const projectDetail = await Services.projectId(id)
            res.status(200).json(projectDetail)
        } catch (error) {
            res.status(500).json(error.message)
        }
    },
    putProjects: async function (req,res) {
        try {
            const update = await Services.updateProject(req.body)
            res.status(201).json(update)
        } catch (error) {
            res.status(500).json(error.message)
        }
    }
}

module.exports = projectControllers