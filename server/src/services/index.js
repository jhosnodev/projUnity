const userTypeServices = require('./userTypes');
const userServices = require('./Users');
const ProjectServices = require('./projects');
const categoriesServices = require('./categories');
const tagsServices = require('./tags');
const commentServices = require("./comments");
const ratingServices = require("./ratings");
const orderServices = require('./order')

const Services = {
    userServices,
    userTypeServices,
    ProjectServices,
    categoriesServices,
    tagsServices,
    commentServices,
    ratingServices,
    orderServices
    
    
}

module.exports = Services