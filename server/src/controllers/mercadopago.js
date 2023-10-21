const mercadopago = require('mercadopago');
const {MP_TOKEN, DB_HOST} = process.env
const { Order_detail , Order, Payments} = require('../db.js');

// Configura las credenciales de MercadoPago
const paymenntsControllers = {

    // Función para crear una preferencia de pago en MercadoPago
     createPaymentPreference:  async function(req, res )  {
      // const { name, price, unit } = req.body; 
      mercadopago.configure({
        access_token: MP_TOKEN
      });
      const id_orden= 1
      const items =[
        {  
          
           id:req.body.id,
           title: req.body.title,
           unit_price:Number(req.body.unit_price),
           quantity: 1
      },
  ]
  const totalPrecio = items.reduce((acumulador, producto) =>
   acumulador + producto.unit_price, 0);
  console.log(totalPrecio)
      const preference = {
        items,
        total_amount:totalPrecio,
        external_reference : `${id_orden}`,
        payer:{
          name: "Lalo",
          surname: "Landa",
          email: "test_user_63274575@testuser.com",
        },
      
           back_urls: {
      success: "http://localhost:3001/createPayment/succes",
      pending: `${DB_HOST}/error`,
      failure: `${DB_HOST}/pending`,
    },
    notification_url: "https://3eb3-181-29-72-133.ngrok.io/webhook",
    auto_return: "approved" 
      };
      try {
        const response = await mercadopago.preferences.create(preference);
        console.log(response.body);
        global.id = response.body.id;
        const totalPrecio = items.reduce((acumulador, producto) =>
        acumulador + producto.unit_price, 0);
        res.json({
          id_mercadopago: global.id,
          init_point: response.body.init_point,
          items: response.body.items,
          back_urls: response.body.back_urls,
          total_amount:totalPrecio
        });
        
        const orderDb = await Payments.create({
          paymentId:global.id,
          status:"created",
          projects:items.map(e=>{
            return{
              id:e.id,
              // title:e.title,
              price:e.unit_price
            }}),
            paymentAmount:totalPrecio,
        })
        console.log(orderDb)
      } catch (error) {
        console.log(error);
      }
    },
    getOrdenId: async function(req, res){
      const {id} = req.params.id
try {
  const getOrders = await Payments.findOne({
    where:{
      id:id,
    }
  });
  res.send(200).json(getOrders)

} catch (error) {
      return (error.message)
}
    }
  };
        
     
     
     
     
      






module.exports =  paymenntsControllers 