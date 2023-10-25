const { Requests } = require('../db'); // Importa el modelo de Requests

const RequestsServices = {
    createRequest: async function(requestsData) {
        try {

            const { user, Status, Technologies, Description, tags, title, location, date } = requestsData;
            if (!user || !Status || !Technologies || !Description || !tags || !title || !location || !date) {
                throw Error("Missing some Data")
            } else {
                const assignRequest = await Requests.create({
                    user,
                    Status,
                    Technologies,
                    Description,
                    tags,
                    title,
                    location,
                    date
                })
                console.log(createRequest);
                createRequest.addUsers(user);
                createRequest.addProject(project);
                return  createRequest
            }
        } catch (error) {
            return error
        }
    },
    getAllRequest: async function() {

        try {
            const getAllRequest = await Requests.findAll({
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
              return getAllRequest;
            } catch (error) {
              return error;
            }
},
};
module.exports = RequestsServices