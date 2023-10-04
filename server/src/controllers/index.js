const userControllers = require('./users');
const userTypeControllers = require('./userTypes')
const projectControllers = require('./projects');
const formControllers = require('./form');
const tagsConstrollers = require('./tags');
const categoriesControllers = require('./categories');

const Controllers = {
    ...userControllers,
    ...userTypeControllers,
    ...projectControllers,
    ...formControllers,
    ...tagsConstrollers,
    ...categoriesControllers
}

module.exports = Controllers

