const { ProjectServices } = require("../services");



const formControllers = {
  createNewProject: async function (req, res) {
    try {

      const projectData = req.body;
      const post = {
        ...projectData,
/*         tags: projectData.tags.split(",").map((tag) => parseInt(tag)), */
/*         price: parseFloat(projectData.price),
        category: parseInt(projectData.category),
        view: 0,
        commentsAllowed: projectData.commentsAllowed === "true" ? true : false,
        visibility: projectData.visibility === "true" ? true : false, */
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
