const { Projects, Comments, Users } = require("../db");

const commentsServices = {
  commentProject: async function (commentsData) {
    console.log(commentsData);
    try {
      const { user, comment, image, active, replyTo, project } = commentsData;
      if (!user || !comment || !image || /* !active || !replyTo || */ !project) {
        throw Error("Missing some Data");
      } else {
        const createComment = await Comments.create({
          user,
          comment,
          image,
          active,
          replyTo,
          project,
        });
        console.log(createComment);
         createComment.addUsers(user);
         createComment.addProject(project);
         return  createComment
      }
    } catch (error) {
      return error;
    }
  },
  getAllComments: async function (query) {
    try {
      const getAllComments = await Comments.findAll({
        include: [
          {
            model: Projects,
            attributes: ["id", "name"],
          },
          {
            model: Users,
            attributes: ["id", "name"],
          },
        ],
      });
      return getAllComments;
    } catch (error) {
      return error;
    }
  },
};
module.exports = commentsServices;
