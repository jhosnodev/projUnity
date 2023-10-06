const { Router } = require("express");
const Controller = require('../controllers');
const passport = require("passport");

const router = Router();

router.get("/", (req,res) => {
    console.log(req.user)
        res.render('home',{user: req.user})
})
router.route('/login')
    .get((req,res) => {
        res.render('login')
    })
    .post(function(req, res) {
        console.log(req.body)
        //res.redirect('/');
    }, passport.authenticate('local',{ successRedirect: '/projects' ,failureRedirect: '/login' }, ()=> {
        console.log(req.body)
    }),
    );

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/login');
    }
};

router.get('/users', Controller.getUsers);
router.post('/users', Controller.postUser);

//router.post('/login', Controller.postLogin);

router.get('/usertypes', Controller.getUserTypes);
router.route('/projects')
    .get(isAuthenticated, Controller.getProjects)
    .put(Controller.putProjects)
    .post( Controller.createNewProject);
    
router.get('/projects/:id', Controller.getProjectsID);


router.get('/categories', Controller.getCategories);
router.get('/tags', Controller.getTags)


module.exports = router;


