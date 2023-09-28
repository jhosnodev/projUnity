const { Router } = require("express");
const {...userControllers} = require('../controllers/users')

const router = Router();

router.get("/", async (req,res) => {
    try {
        res.status(200).json({mensaje: 'api de PF ProjUnity'})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

router.get('/users', getUsers);
router.post('/users',)

module.exports = router;


