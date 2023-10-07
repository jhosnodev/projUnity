const Services = require('../services').tagsServices;

const tagsConstrollers = {
    getTags: async function (req,res) {
        try {
            const Tags = await Services.allTags(req.query)
            res.status(200).json(Tags)
        } catch (error) {
            res.status(500).json(error.message)
        }
    }
}

module.exports = tagsConstrollers