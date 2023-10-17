const userTypeServices = require('./userTypes');
const userServices = require('./Users');
const ProjectServices = require('./projects');
const categoriesServices = require('./categories');
const tagsServices = require('./tags');
const commentServices = require("./comments");
// const paymentServices = require('./payments');
const orderServices = require('./order')

const Services = {
    userServices,
    userTypeServices,
    ProjectServices,
    categoriesServices,
    tagsServices,
    commentServices,
    // paymentServices,
    orderServices
}

module.exports = Services