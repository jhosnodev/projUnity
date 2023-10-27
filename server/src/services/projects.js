const { Projects, Category, Tags, Comments, Ratings, Users } = require("../db");
const { Op } = require("sequelize");

const cloudinary = require("cloudinary").v2;

const {
  CB_CLOUD_NAME,
  CB_API_KEY ,
  CB_API_SECRET,
} = process.env;

cloudinary.config({
  cloud_name: CB_CLOUD_NAME,
  api_key: CB_API_KEY,
  api_secret: CB_API_SECRET,
});


const ProjectServices = {
  allProjects: async function (queryParams) {
    try {
      const { name, category, tag, price, rating, username, id, deleted } = queryParams;
      let condition = {};
      id 
        ? (condition = {
          ...condition,
          project:
            {...condition.project, id: id}
          })
        : null;
      name
        ? (condition = {
            ...condition,
            project: {
              name: { [Op.iLike]: `%${name}%` },
              [Op.or]: [{ name: { [Op.iLike]: `${name}%` } }],
            },
          })
        : null;
      tag
        ? (condition = {
            ...condition,
            tag: {
              name: { [Op.iLike]: `%${tag}%` },
              [Op.or]: [{ name: { [Op.iLike]: `${tag}%` } }],
            },
          })
        : null;
      category
        ? (condition = {
            ...condition,
            category: {
              name: { [Op.iLike]: `%${category}%` },
              [Op.or]: [{ name: { [Op.iLike]: `${category}%` } }],
            },
          })
        : null;
      price
        ? (condition = {
            ...condition,
            project: {
              ...condition.project,
              price: {
                [Op.or]: { [Op.lt]: price, [Op.eq]: price },
              },
            },
          })
        : null;
      rating
        ? (condition = {
            ...condition,
            ratings: {
              score: {
                [Op.gte]: rating,
              },
              // [Op.or]: [{ score: { [Op.eq]: score } }],
            },
          })
        : null;

      if (Object.keys(condition).length !== 0) {
        const projectsFilter = await Projects.findAll({
          include: [
            {
              model: Category,
              attributes: ["name"],
              where: condition.category,
              through: { attributes: [] },
            },
            {
              model: Tags,
              attributes: ["name"],
              where: condition.tag,
              through: { attributes: [] },
            },
            {
              model: Ratings,
              attributes: ["score", "comment"],
              where: condition.rating,
              through: { attributes: [] },
            },
            {
              model: Users,
              attributes: ["id", "name", "email"],
              where: condition.users,
              through: { attributes: [] },
            },
          ],
          where: condition.project,
          paranoid: deleted? false : true
        });
        return projectsFilter;
      } else {
        const allProject = await Projects.findAll({
          include: [
            {
              model: Category,
              attributes: ["name"],
              through: { attributes: [] },
            },
            {
              model: Tags,
              attributes: ["name"],
              through: { attributes: [] },
            },
            {
              model: Ratings,
              attributes: ["score", "comment"],
              through: { attributes: [] },
            },
            {
              model: Users,
              attributes: ["id", "name", "email"],
              /*        where: condition.users, */
              through: { attributes: [] }
            },
          ],
          paranoid: deleted? false : true
        });
        return allProject;
      }
    } catch (error) {
      return error;
    }
  },
  projectId: async function (id) {
    try {
      const ProjectId = await Projects.findOne({
        where: { id: id },
        include: [
          {
            model: Category,
            attributes: ["name"],
            through: { attributes: [] },
          },
          {
            model: Tags,
            attributes: ["name"],
            through: { attributes: [] },
          },
          {
            model: Comments,
            attributes: ["id", "comment", "replyTo"],
            through: { attributes: [] },
          },
          {
            model: Ratings,
            attributes: ["score", "comment"],
/*             where: condition.rating, */
            through: { attributes: [] },
          },
          {
            model: Users,
            attributes: [
              "id",
              "name",
              "email",
          
            ],
     /*        where: condition.users, */
            through: { attributes: [] },
          },
        ],
        where: condition.project,
        paranoid: deleted? false : true
      });
      if (ProjectId) {
        return ProjectId;
      } else {
        throw Error(`Id ${id} no encontrado`);
      }
    } catch (error) {
      return error;
    }
  },

  getProjectsByID: async function (id) {
    try {
      const ProjectId = await Projects.findOne({
        where: { id: id},
        include: [
          {
            model: Category,
            attributes: ["name"],
            through: { attributes: [] },
          },
          {
            model: Tags,
            attributes: ["name"],
            through: { attributes: [] },
          },
          {
            model: Comments,
            attributes: ["id", "comment", "replyTo"],
            through: { attributes: [] },
          },
          {
            model: Ratings,
            attributes: ["score", "comment"],
            /*             where: condition.rating, */
            through: { attributes: [] },
          },
          {
            model: Users,
            attributes: ["id", "name", "email"],
            /*        where: condition.users, */
            through: { attributes: [] },
          },
        ],
      });
      if (ProjectId) {
        return ProjectId;
      } else {
        throw Error(`Id ${id} no encontrado`);
      }
    } catch (error) {
      return error;
    }
  },
  
  createProjects: async function (projectData) {
    try {
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
        tags, 
        userId
      } = projectData;
      console.log(projectData)
      if (
        !name ||
        !description ||
        !price ||
        !shortDescription ||
        !image ||
       /*  !commentsAllowed || */
        !status ||
        !category ||
        !tags ||
        !userId
      ) {
        throw Error("Missing some Data");
      } else {
        const uploadedImage = await cloudinary.uploader.upload(image);

        console.log(projectData);
        console.log(uploadedImage);
        const [newProject, created] = await Projects.findOrCreate({
          where: { name: name },
          defaults: {
            name,
            description,
            price: parseFloat(price),
            visibility: visibility /* === "true" ? true : false */,
            shortDescription,
            image : uploadedImage.url,
            views: 0,
            commentsAllowed: commentsAllowed === "true" ? true : false,
            status,
          },
        });
        if (created) {
          newProject.addCategory(parseInt(category));
          tags.map((tag) => newProject.addTag(parseInt(tag)));
          newProject.addUsers(userId);
          return newProject;
        } else {
          throw Error(`el proyecto ${name} ya existe`);
        }
      }

    } catch (error) {
      return error;
    }
  },

  updateProject: async function (projectId, projectData) {
    try {
      const {
        name,
        description,
        price,
        visibility,
        shortDescription,
        image,
        commentsAllowed,
        status,
        category,
        tags,
      } = projectData;

      // find the project by ID
      const project = await Projects.findByPk(projectId);

      if (!project) {
        throw new Error("Project not found");
      }

      // update the project data
      project.name = name || project.name;
      project.description = description || project.description;
      project.price = price || project.price;
      project.visibility = visibility || project.visibility;
      project.shortDescription = shortDescription || project.shortDescription;
      project.image = image || project.image;
      project.commentsAllowed = commentsAllowed || project.commentsAllowed;
      project.status = status || project.status;

      if (image) {
        const uploadedImage = await cloudinary.uploader.upload(image);
        project.image = uploadedImage.secure_url;
      }

      // update the project category
      if (category) {
        const categoryObj = await Category.findOne({ where: { id: category } });
        if (!categoryObj) {
          throw new Error("Invalid category");
        }
        project.categoryId = category;
      }

      // update the project tags
      if (tags && typeof tags === "string") {
        const tagIds = tags.split(",").map((tag) => parseInt(tag));
        const tagObjs = await Tags.findAll({ where: { id: tagIds } });
        if (tagObjs.length !== tagIds.length) {
          throw new Error("Invalid tags");
        }
        await project.setTags(tagIds);
      }

      // save the changes
      await project.save();

      return project;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  deleteProject: async function(projectId) {
    try {
      const project = await Projects.findByPk(projectId);
      if (!project) {
        throw new Error('Project not found');
      }
      await project.destroy();
      return { message: 'Project deleted successfully' };
    } catch (error) {
      throw new Error(error.message);
    }
  },
  restoreProjects: async function (projectId) {
    try {
      const project = await Projects.findByPk(projectId, {paranoid: false});
      if (!project) {
        throw new Error('Project not found');
      }
      await project.restore();
      return { message: 'Project restored successfully' };
    } catch (error) {
      throw new Error(error.message);
    }
  },


};

module.exports = ProjectServices;
