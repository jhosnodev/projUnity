const { Requests } = require('../db'); // Importa el modelo de Requests

const RequestsServices =  {
    createRequest: async function(requestsData){
       try{

       const {user,project,status,description, } = ratingData;
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
              });
              return getAllRatings
          } catch (error) {
              return error
          }
          },
}
module.exports = RatingServices
