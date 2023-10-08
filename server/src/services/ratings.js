const {Ratings} = require("../db");

const RatingServices =  {
    assignRatingProject: async function(ratingData){
       try{

       
        const {user,project,score,comment} = ratingData;
        if(!user || !project || !score || !comment){
            throw Error ("Missing some Data")
        }else{
            const assignRating = await Ratings.create({
                user,
                project,
                score,
                comment
            })

            return assignRating.addProject(project)
        }
    }catch(error){
        return error
    }
        }
}
module.exports = RatingServices