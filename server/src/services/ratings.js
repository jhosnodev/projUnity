const { where } = require("sequelize");
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
        },
        getAllRatings: async function(query){
    
            try {
              const getAllRatings = await Ratings.findAll({
                include:[
                    attri
                ]
              });
              return getAllRatings
          } catch (error) {
              return error
          }
          },
}
module.exports = RatingServices