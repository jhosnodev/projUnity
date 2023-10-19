const { ProjectServices } = require("../services");



const formControllers = {
  createNewProject: async function (req, res) {
    try {

      const projectData = req.body;
      const post = {
        ...projectData,
      };
      console.log(projectData);

      const newProject = await ProjectServices.createProjects(post);
      res.status(200).json(newProject);
      console.log(newProject);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
};

module.exports = formControllers;
