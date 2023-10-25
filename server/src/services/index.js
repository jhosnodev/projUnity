const Services = {
    userTypeServices: require('./userTypes'),
    userServices: require('./Users'),
    ProjectServices: require('./projects'),
    categoriesServices: require('./categories'),
    tagsServices: require('./tags'),
    commentServices: require("./comments"),
    ratingServices: require("./ratings"),
    requestsService:require("./requests"),
    dashboardServices: require ('./userDashboard'),
    paymentPreferences: require('./payment')
}

module.exports = Services