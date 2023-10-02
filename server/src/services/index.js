const userTypeServices = require('./userTypes');
const userServices = require('./Users');
const ProjectServices = require('./projects')

const Services = {
    userServices,
    userTypeServices,
    ProjectServices
}

module.exports = Services