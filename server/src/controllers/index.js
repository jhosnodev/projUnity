const userControllers = require('./users');
const userTypeControllers = require('./userTypes')
const projectControllers = require('./projects')

const Controllers = {
    ...userControllers,
    ...userTypeControllers,
    ...projectControllers
}

module.exports = Controllers

