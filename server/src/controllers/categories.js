const Services = require('../services').categoriesServices;

const categoriesControllers = {
    getCategories: async function (req,res) {
        try {
            const Categories = await Services.allCategories(req.query)
            res.status(200).json(Categories)
        } catch (error) {
            res.status(500).json(error.message)
        }
    }
}

module.exports = categoriesControllers