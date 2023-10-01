const userControllers = require('./users');
const userTypeControllers = require('./userTypes')
const projectControllers = require('./projects');
const formControllers = require('./form');

const Controllers = {
    ...userControllers,
    ...userTypeControllers,
    ...projectControllers,
    ...formControllers
}

module.exports = Controllers

