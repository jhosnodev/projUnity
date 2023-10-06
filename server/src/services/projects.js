const { Projects, Category, Tags, Comments } = require("../db");
const { Op } = require("sequelize");

const ProjectServices = {
  allProjects: async function (query) {
    try {
      const { name, category, tag, price } = query;
      let condition = {};
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
          ],
          where: condition.project,
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
          ],
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
            attributes: ["comment"],
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
      } = projectData;
      console.log(projectData)
      if (
        !name ||
        !description ||
        !price ||
        !visibility ||
        !shortDescription ||
        !image ||
        !commentsAllowed ||
        !status ||
        !category ||
        !tags
      ) {
        throw Error("Missing some Data");
      } else {
        console.log(projectData);
        const [newProject, created] = await Projects.findOrCreate({
          where: { name: name },
          defaults: {
            name,
            description,
            price: parseFloat(price),
            visibility: visibility === "true" ? true : false,
            shortDescription,
            image,
            views : 0,
            commentsAllowed: commentsAllowed === "true" ? true : false,
            status,
          },
        });
        if (created) {
          newProject.addCategory(parseInt(category));
          tags.split(',').map((tag) => newProject.addTag(parseInt(tag)));
          return newProject;
        } else {
          throw Error(`el proyecto ${name} ya existe`);
        }
      }

    } catch (error) {
      return error;
    }
  },
  updateProject: async function (projectData) {
    try {
      const {
        id,
        name,
        title,
        description,
        price,
        visibility,
        shortDescription,
        image,
        commentsAllowed,
        views,
        status,
      } = projectData;
      const updated = await Projects.update(projectData, { where: { id: id } });
      if (updated) {
        const response = await Projects.findByPk(id);
        return response;
      }
    } catch (error) {
      return error;
    }
  },
  commentProject: async function (commentsData){
    try {
      const {comment, image, active, replyTo, project } = commentsData;
      if(!comment || !image || !active || !replyTo || !project){
        throw Error ("Missing some Data")
      }else{
        const createComment = await Comments.create({
          comment,
           image,
            active,
             replyTo,
            project
          })
          console.log(createComment)   
            
            return createComment.addProject(project)
            
          console.log(project) 
          // return createComment.addProjects(project)
          // return createComment
        // const [newComment, created] = await Comments.findOrCreate({
        //   defaults:{
        //     comment,
        //     image,
        //     active: active=== "true" ? true: false,
        //     replyTo: replyTo === "true" ? true : false
      }
    } catch (error) {
      return error
    }
  }
};

module.exports = ProjectServices;
