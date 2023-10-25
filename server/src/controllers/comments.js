const { commentServices } = require("../services");

const commentsControllers = {
  createComment: async function (req, res) {
    try {
      const commentData = req.body;
      const comment = { ...commentData };
      const newComment = await commentServices.commentProject(comment);
      console.log(newComment);
      res.status(201).json(newComment);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
  getComment: async function (req, res) {
    try {
      const commentData = req.body;
      const getComment = await commentServices.getAllComments(commentData);
      res.status(200).json(getComment);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
  
  getCommentUser: async function (req, res) {
    try {
      const commentData = req.body;
      const getCommentUser = await commentServices.getAllCommentsUser(commentData);
      res.status(200).json(getCommentUser);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
};

module.exports = commentsControllers;
