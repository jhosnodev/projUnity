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
        if (authorizedMethods?.some(x => x === method)){
            return next()
        } else {
            res.status(401).json({message: 'User Role not authorized'})
        }
    }
};

router.get('/', isAuthenticated);

router.route('/users')
    .get(isAuthenticated, isAuthorized, Controller.getUsers)
    .post(isAuthenticated, isAuthorized, Controller.postUser);

router.get('/usertypes',isAuthenticated, isAuthorized, Controller.getUserTypes);

router.route('/projects')
    .get(isAuthenticated, isAuthorized, Controller.getProjects)
    .put(isAuthenticated, isAuthorized, Controller.putProjects)
    .post(isAuthenticated, isAuthorized, Controller.createNewProject);

router.get('/projects/:id', isAuthorized, isAuthenticated, Controller.getProjectsID);

router.get('/categories',isAuthenticated, isAuthorized, Controller.getCategories);
router.get('/tags',isAuthenticated, isAuthorized, Controller.getTags);


router.get('/users', Controller.getUsers);
router.post('/users', Controller.postUser);
router.get('/usertypes', Controller.getUserTypes);
router.get('/projects', Controller.getProjects);
router.get('/projects/:id', Controller.getProjectsID);
router.put('/projects',Controller.putProjects);
router.post('/projects', Controller.createNewProject);
router.post("/comments", Controller.createComment);
router.get("/comments",Controller.getComment);
router.get('/categories', Controller.getCategories);
router.get('/tags', Controller.getTags);


router.route('/comments')
  .post(isAuthenticated, isAuthorized, Controller.createComment)
  .get(isAuthenticated, isAuthorized, Controller.getComment);


module.exports = router;


