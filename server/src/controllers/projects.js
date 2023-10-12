const Services = require('../services').ProjectServices;

const projectControllers = {
    getProjects: async function (req,res) {
        try {
            const { id } = req.params
            if (id && isNaN(id)) {
              res.status(401).send('project ID is not a number')
            } else {
              const projectsFilter = await Services.allProjects({...req.query, id})
              res.status(200).json(projectsFilter)
            }
        } catch (error){
            res.status(500).json(error.message)
        }
    },
    putProjects: async function (req, res) {
      try {
        const { id } = req.params;
        const projectData = req.body;
        if (id && isNaN(id)) {
          res.status(401).send('project ID is not a number')
        } else {
          const updatedProject = await Services.updateProject(
            id,
            projectData
          );
          console.log(updatedProject);
          res.status(200).json(updatedProject);
        }
      } catch (error) {
        res.status(500).json(error.message);
      }
    },
    deleteProject: async function (req, res) {
      try {
        const { id } = req.params;
  
        const result = await Services.deleteProject(id);
  
        res.status(200).json(result);
      } catch (error) {
        res.status(500).json(error.message);
      }
    },
}

module.exports = projectControllers;