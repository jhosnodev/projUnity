const {Tags} = require ('../db');

const tagsServices = {
    allTags: async function (query) {
        try {
            const allTags = await Tags.findAll();
            return allTags
        } catch (error) {
            return error
        }
    }
}

module.exports = tagsServices