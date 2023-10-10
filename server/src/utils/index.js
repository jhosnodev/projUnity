const projects = require('./projects.json');
const users = require('./users.json');
const userTypes = require('./usertypes.json');
const categories = require ('./categories.json');
const projectCategory = require('./projectCategory.json')
const tags = require('./tags.json');
const projectTags = require('./projectTags.json');
const comments = require("./comments.json");
const commentsProject = require("./commentsProjects.json");
const  ratings = require("./ratings.json");
const projectsRatings = require("./projectsRatings.json")

const bulkData = {
    projects,
    users,
    userTypes,
    categories,
    projectCategory,
    tags,
    projectTags,
    commentsProject,
    comments,
    ratings,
    projectsRatings

}

module.exports = bulkData