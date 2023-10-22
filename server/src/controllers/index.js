const userControllers = require('./users');
const userTypeControllers = require('./userTypes');
const projectControllers = require('./projects');
const formControllers = require('./form');
const commentControllers = require("./comments")
const tagsConstrollers = require('./tags');
const categoriesControllers = require('./categories');
const ratingsControllers = require("./ratings");
const dashBoardController = require('./dashboard')
const orderControllers = require('./order')
const paymentsControllers = require("./mercadopago")

const Controllers = {
    ...userControllers,
    ...userTypeControllers,
    ...projectControllers,
    ...formControllers,
    ...tagsConstrollers,
    ...categoriesControllers,
    ...commentControllers,
    ...ratingsControllers,
    ...dashBoardController,
    ...orderControllers,
    ...paymentsControllers,
    
}

module.exports = Controllers

