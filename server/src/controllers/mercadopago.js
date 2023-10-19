const mercadopago = require('mercadopago');
const {MP_TOKEN, DB_HOST} = process.env

// Configura las credenciales de MercadoPago
const paymenntsControllers = {

  
    // Función para crear una preferencia de pago en MercadoPago
     createPaymentPreference:  async function(req, res )  {
      
      mercadopago.configure({
        access_token: MP_TOKEN
      });
      const id_orden= 1
      let preference = {
          items:[
            {
                title: req.body.title,
                quantity: 1,
                unit_price: 200,
          },
          
        ],
        external_reference : `${id_orden}`,
           back_urls: {
      success: `${DB_HOST}/mercadopago/pagos`,
      failure: `${DB_HOST}/mercadopago/pagos`,
      pending: `${DB_HOST}/mercadopago/pagos`,
    },
      };
      mercadopago.preferences.create(preference)
      .then(function(response){
        console.log(response.body);
        global.id = response.body.id;
        res.json({id: global.id, init_point: response.body.init_point});
      }).catch(function(error){
        console.log(error);
      })
}


}

module.exports =  paymenntsControllers 