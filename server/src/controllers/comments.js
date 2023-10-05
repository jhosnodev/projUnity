const { ProjectServices } = require("../services");

const formControllers={

    createComment: async function(req, res){
        try {
            const commentData = req.body
            const comment ={...commentData}
            const newComment = await ProjectServices.commentProject(comment)
            console.log(newComment)
            res.status(200).json(newComment)
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
}

module.exports = formControllers;