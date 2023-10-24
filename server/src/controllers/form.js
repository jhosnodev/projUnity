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
      if (newProject.id) {
        res.status(201).json(newProject);
      } else {
        res.status(400).json({ type: "error", response: "Algo falló" });
      }
      console.log(newProject);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
};

module.exports = formControllers;
