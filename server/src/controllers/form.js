<<<<<<< HEAD
const { ProjectServices } = require('../services');
// const Cloudinary = require('cloudinary');
// const Image = require('../models/images');

// Cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret : process.env.CLOUDINARY_API_SECRET
// });

// const fs = require('fs-extra');
=======
const { ProjectServices } = require("../services");
const Cloudinary = require("cloudinary");
const Image = require("../models/images");

/* Cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
}); */

const fs = require("fs-extra");
>>>>>>> 899ddeff4a864058360c6b6ce34f5a266808bffd

const formControllers = {
  createNewProject: async function (req, res) {
    try {
<<<<<<< HEAD
      const {
        name,
        description,
        price,
        visibility,
        shortDescription,
        image,
        commentsAllowed,
        views,
        status,
        category,
        tags
      } = req.body
      // const {projectData} = req.body;
      // const result = await Cloudinary.v2.uploader.upload(req.file.path);
      // const Image = new Image({
      //   imageUrl: result.secure_url,
      //   public_id: result.public_id
      // })

      // await Image.save();
      // await fs.unlink(req.file.path);
      const newProject = await ProjectServices.createProjects(  
       req.body
        );
=======

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
      /*       const result = await Cloudinary.v2.uploader.upload(req.file.path);
      const Image = new Image({
        imageUrl: result.secure_url,
        public_id: result.public_id,
      });

      await Image.save();
      await fs.unlink(req.file.path); */
      const newProject = await ProjectServices.createProjects(post);
>>>>>>> 899ddeff4a864058360c6b6ce34f5a266808bffd
      res.status(200).json(newProject);
      console.log(newProject);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
};

module.exports = formControllers;
