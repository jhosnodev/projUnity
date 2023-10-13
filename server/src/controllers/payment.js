const mercadopago = require("mercadopago");
const { MP_TOKEN }  = process.env

const paymentsControllers ={
 createOrder : async function ( req, res) {
     mercadopago.configure({
        access_token : MP_TOKEN
    });
 const result = await mercadopago.preferences.create({
    items:[
        {
        title: req.body.name,
        unit_price:50,
        currency_id:"ARG",
        quantity:1
        }
    ],
    notification_url: "http://localhost:3001/webhook",
    back_urls: {
        success: "http://localhost:3001/succes"
    },
});



console.log(result)

res.send(result.body);
},
receiveWebHook: async function (req, res){
    try {
        const payment = req.query;
        console.log(payment);
        if (payment.type === "payment") {
          const data = await mercadopago.payment.findById(payment["data.id"]);
          console.log(data);
        }
    
        res.sendStatus(204);
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something goes wrong" });
      }
}
}



module.exports = paymentsControllers