const { Router } = require("express");
const Controller = require("../controllers");
const Autorization = require("../utils/seguridadrutas");



const router = Router();

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    //console.log(req.user.role)
    next();
  } else {
    res.redirect("/login");
  }
}

function isAuthorized(req, res, next) {
  const { url, user, method } = req;
  const path = url.split("/")[1];
  const authorizedPaths = Autorization[user.role];
  const authorizedMethods = authorizedPaths[path];
  //console.log(authorizedMethods)
  if (user.role === "admin") return next();
  else {
    if (authorizedMethods?.some((x) => x === method)) {
      return next();
    } else {
      res.status(401).json({ message: "User Role not authorized" });
    }
  }
}

router.get("/", isAuthenticated);


router.delete('/users/:id',isAuthenticated, isAuthorized, Controller.deleteUser)


router.put('/users/restore/:id',isAuthenticated, isAuthorized, Controller.restoreUser)



router.post("/sign-up", Controller.postUser);
router.route('/users')
    .get(Controller.getUsers);

/* router.post('/sign-up', Controller.postUser); */

router.get(
  "/usertypes",
  isAuthenticated,
  isAuthorized,
  Controller.getUserTypes
);
router.get('/privpolicy', (req,res) => {
  res.render('privacy_policy')
})

router
  .route("/projects")
  .get(Controller.getProjects)
  .post(Controller.createNewProject);

router
  .route("/projects/:id")
  .put(Controller.putProjects)
  .delete( Controller.deleteProject)

router.put('/projects/restore/:id', Controller.restoreProject)



router.get('/projects/:id', Controller.getProjectsID);


router.get("/categories", Controller.getCategories);
router.get("/tags", Controller.getTags);

router
  .route("/comments")
  .post(Controller.createComment)
  .get(Controller.getComment);

router
  .route("/ratings")
  .post(isAuthenticated, isAuthorized, Controller.assignRating)
  .get(isAuthenticated, isAuthorized, Controller.getRattingProject);

router
.route("/payment")
.post(Controller.createPaymentPreference)

router.get("/payment/:id", Controller.getOrdenId);
router.get("/payment",Controller.getAllPayment)
router
.route("/createPayment/succes")
.get((req, res)=> {
  res.send("PAGO REALIZADO CON EXITO")
})


module.exports = router;






module.exports = router;


