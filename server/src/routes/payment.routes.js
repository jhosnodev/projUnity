
const { Router } = require("express");
const Controller = require("../controllers")



const router = Router();

router.post("/create-order",Controller.createOrder)

router.post("/webhook",Controller.receiveWebHook)

router.get("/succes", (req, res)=> {
    res.send("pago realizado")
})




module.exports = router;