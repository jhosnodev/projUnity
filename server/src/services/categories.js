const {Category} = require('../db');

const categoriesServices = {
    allCategories: async function (query) {
        try{
            const allCategories = await Category.findAll()
            return allCategories
        } catch (error) {
            return error
        }
    }
}

module.exports = categoriesServices