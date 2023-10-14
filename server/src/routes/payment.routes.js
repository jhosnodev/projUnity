
const { Router } = require("express");
const Controller = require("../controllers")



const router = Router();

router.post("/create-order",Controller.createOrder);

router.get("/succes", (req, res)=> {
    res.json({message: "Pago realizado con exito !!!"})
});

router.get("/failure", (req, res)=> {
    res.send("fallo pago")
});

router.get("/pending", (req, res)=> {
    res.send("pago pendiente")
});




router.post("/webhook",Controller.receiveWebHook)





module.exports = router;