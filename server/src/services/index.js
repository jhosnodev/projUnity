const userTypeServices = require('./userTypes');
const userServices = require('./Users');
const ProjectServices = require('./projects');
const categoriesServices = require('./categories');
const tagsServices = require('./tags');
const commentServices = require("./comments")

const Services = {
    userServices,
    userTypeServices,
    ProjectServices,
    categoriesServices,
    tagsServices,
    commentServices
}

module.exports = Services