const Services = require('../services').ProjectServices;

const projectControllers = {
  getProjects: async function (req,res) {
    try {
      const { id } = req.params;
       if (id && Number.isNaN(Number(id))) {
        res.status(401).send('Project ID is not a valid number');
       } else {
         const projectsFilter = await Services.allProjects({...req.query})
         res.status(200).json(projectsFilter)
       }
   } catch (error){
       res.status(500).json(error.message)
   }
},
getProjectsID: async function (req,res) {
  try {
      const {id} = req.params
      const projectDetail = await Services.getProjectsByID(id)
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

    deleteProject: async function (req, res) {
      try {
        const projectId = req.params.id;
  
        const result = await Services.deleteProject(projectId);
  
        res.status(200).json(result);
      
      } catch (error) {
        res.status(500).json(error.message);
      }
    },
    getDeletedProjects: async function (req, res) {
      try {
          const deletedProjects = await Services.getDeletedProjects();
          res.status(200).json(deletedProjects);
      } catch (error) {
          res.status(500).json(error.message);
      }
  },
    restoreProject : async function (req, res) {
      try{
        const projectId = req.params.id;
        const result = await Services.restoreProjects(projectId);
        res.status(200).json(result);
      }catch(error){
        res.status(500).json(error.message);
      }
    }
}

module.exports = projectControllers;