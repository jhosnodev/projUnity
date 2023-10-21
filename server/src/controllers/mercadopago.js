const mercadopago = require('mercadopago');
const {MP_TOKEN} = process.env
// Configura las credenciales de MercadoPago
const paymenntsControllers = {

    
    // Función para crear una preferencia de pago en MercadoPago
     createPaymentPreference:  async function(req, res)  {
        mercadopago.configure({
            access_token : MP_TOKEN
        });
       
          
          const result = await mercadopago.preferences.create({
            items:[
              {
                title: req.body.name,
                unit_price:1,
                currency_id:"ARS",
                quantity:1
              }
            ],
            // back_urls: {
            //   success: "http://localhost:3001/succes",
            //   failure: "http://localhost:3001/failure",
            //   pending: "http://localhost:3001/pending"
    
    
              
            // },
            // notification_url: "https://3eb3-181-29-72-133.ngrok.io/webhook",
          });
          
          
          
          console.log(result)
          
          res.json(result.body);
      
    },
}

module.exports =  paymenntsControllers 