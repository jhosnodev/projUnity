const { Router } = require("express");
const Controller = require('../controllers')

const router = Router();

router.get("/", async (req,res) => {
    try {
        res.status(200).json({mensaje: 'api de PF ProjUnity'})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

router.get('/users', Controller.getUsers);
router.post('/users', Controller.postUser);
router.get('/usertypes', Controller.getUserTypes);
router.get('/projects', Controller.getProjects);
router.get('/projects/:id', Controller.getProjectsID);
router.put('/projects',Controller.putProjects);
router.post('/projects', Controller.createNewProject);
router.post("/comments", Controller.createComment);



module.exports = router;


