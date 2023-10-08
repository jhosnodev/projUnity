const { ratingServices } = require("../services");

const ratingsControllers={

    assignRating: async function(req, res){
        try {
            const ratingData = req.body
            const rating ={...ratingData}
            const newRating = await ratingServices.assignRatingProject(rating)
            console.log(newRating)
            res.status(200).json(newRating)
        } catch (error) {
            res.status(500).json(error.message);
        }
    },
    // getComment: async function(req,res){
    //     try{
    //         const commentData = req.body
    //         const getComment = await commentServices.getAllComments(commentData)
    //         res.status(200).json(getComment)
    //     }catch(error){
    //         res.status(500).json(error.message)
    //     }
    // }
}

module.exports = ratingsControllers;