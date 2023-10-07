const { Router } = require("express");
const Controller = require('../controllers');
const Autorization = require('../utils/seguridadrutas');

const router = Router();

function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        //console.log(req.user.role)
        next();
    } else {
        res.redirect('/login');
    }
};

function isAuthorized(req, res, next) {
    const {url, user, method} = req
    const path = url.split('/')[1]
    const authorizedPaths = Autorization[user.role]
    const authorizedMethods = authorizedPaths[path]
    //console.log(authorizedMethods)
    if (user.role === 'admin') return next();
    else {
        if (authorizedMethods.some(x => x === method)){
            return next()
        } else {
            res.status(401).json({message: 'User Role not authorized'})
        }
    }
}

router.get('/', isAuthenticated)

router.route('/users')
    .get(isAuthenticated, isAuthorized, Controller.getUsers)
    .post(isAuthenticated, Controller.postUser);

router.get('/usertypes', Controller.getUserTypes);

router.route('/projects')
    .get(isAuthenticated, Controller.getProjects)
    .put(isAuthenticated, Controller.putProjects)
    .post(isAuthenticated, Controller.createNewProject);

router.get('/projects/:id', isAuthenticated, Controller.getProjectsID);


router.get('/categories',isAuthenticated, Controller.getCategories);
router.get('/tags',isAuthenticated, Controller.getTags);


module.exports = router;


