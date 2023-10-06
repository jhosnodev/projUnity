const userControllers = require('./users');
const userTypeControllers = require('./userTypes')
const projectControllers = require('./projects');
const formControllers = require('./form');
const createComment = require("./comments")
const tagsConstrollers = require('./tags');
const categoriesControllers = require('./categories');


const Controllers = {
    ...userControllers,
    ...userTypeControllers,
    ...projectControllers,
    ...formControllers,
    ...createComment,
    ...tagsConstrollers,
    ...categoriesControllers
}

module.exports = Controllers

