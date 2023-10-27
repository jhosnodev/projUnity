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

      const user = await Users.findByPk(projectData.userId);


      const userMail = user.email
      const subject = "¡Tu proyecto ha sido creado con éxito! 🚀";
      const text = `Querid@ ${user.name} Tu proyecto se ha creado con éxito. Esto es un gran paso hacia la realización de tu visión.! `
      const html = `<p>
              <strong>Querid@ ${user.name},</strong>
              </p>

              <p>Tu proyecto se ha creado con éxito. Esto es un gran paso hacia la realización de tu visión.!</p>
              <p>Si deseas realizar cambios o actualizar la información de tu proyecto, puedes hacerlo desde tu panel de control</p>
              <p>No dudes en ponerte en contacto con nuestro equipo de soporte si necesitas ayuda o tienes preguntas adicionales.</p>
              <p>¡Gracias por ser parte de nuestra comunidad y por compartir tu proyecto con nosotros!</p>
              <p>Saludos,</p>
              <hr>
              <p>El equipo de ProJunity</p>
              <p>@2023 ProJunity. Todos los derechos reservados.</p>
              `
      sendEmail(userMail, subject, text, html)

      res.status(200).json(newProject);
      console.log(newProject);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
};

module.exports = formControllers;
