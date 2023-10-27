const { ProjectServices } = require("../services");
const {sendEmail} = require("./mailer");
const { Users } = require('../db');

const formControllers = {
  createNewProject: async function (req, res) {
    try {
      const projectData = req.body;
      const post = {
        ...projectData,
      };

      const newProject = await ProjectServices.createProjects(post);
<<<<<<< HEAD
      if (newProject.id) {
        res.status(201).json(newProject);
      } else {
        res.status(400).json({ type: "error", response: "Algo falló" });
      }
=======

      const user = await Users.findByPk(projectData.userId);


      const userMail = user.email
      const subject = "Proyecto creado con éxito ✔";
      const text = `Querido ${user.name} Tu proyecto se ha creado con éxito. Felicitaciones y gracias por hacer de nuestra comunidad un lugar mejor! `
      const html = "<b>Tu nuevo proyecto ya está ONLINE!</b> 😂 "
      sendEmail(userMail, subject, text, html)

      res.status(200).json(newProject);
>>>>>>> 3b8ae8d724fb469873a651caea0bccb461d1a073
      console.log(newProject);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
};

module.exports = formControllers;
