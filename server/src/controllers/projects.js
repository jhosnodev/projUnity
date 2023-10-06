const Services = require('../services').ProjectServices;

const projectControllers = {
    getProjects: async function (req,res) {
        try {
            const {name, category, tag} = req.query
            const allProjects = await Services.allProjects(req.query)
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
    putProjects: async function (req, res) {
        try {
          const projectId = req.params.id;
          const projectData = req.body;
    
          const updatedProject = await Services.updateProject(
            projectId,
            projectData
          );
    
          res.status(200).json(updatedProject);
          console.log(updatedProject);
        } catch (error) {
          res.status(500).json(error.message);
        }
      },
}

module.exports = projectControllers