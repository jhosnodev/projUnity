const userControllers = require('./users');
const userTypeControllers = require('./userTypes')
const projectControllers = require('./projects');
const formControllers = require('./form');
const createComment = require("./comments")

const Controllers = {
    ...userControllers,
    ...userTypeControllers,
    ...projectControllers,
    ...formControllers,
    ...createComment,
}

module.exports = Controllers

