const { ProjectServices } = require("../services");
const Cloudinary = require("cloudinary");
const Image = require("../models/images");

/* Cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
}); */

const fs = require("fs-extra");

const formControllers = {
  createNewProject: async function (req, res) {
    try {
      const projectData = req.body;
      const post = {
        ...projectData,
        tags: projectData.tags.split(",").map((tag) => parseInt(tag)),
        price: parseFloat(projectData.price),
        category: parseInt(projectData.category),
        view: 0,
        commentsAllowed: projectData.commentsAllowed === "true" ? true : false,
        visibility: projectData.visibility === "true" ? true : false,
      };
      console.log(post);
      /*       const result = await Cloudinary.v2.uploader.upload(req.file.path);
      const Image = new Image({
        imageUrl: result.secure_url,
        public_id: result.public_id,
      });

      await Image.save();
      await fs.unlink(req.file.path); */
      const newProject = await ProjectServices.createProjects(post);
      res.status(200).json(newProject);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
};

module.exports = formControllers;
