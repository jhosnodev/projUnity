const mercadopago = require('mercadopago');
const {MP_TOKEN, DB_HOST} = process.env
const { Order_detail , Order, Payments} = require('../db.js');
const paymentsServices = require('../services/payment.js');

// Configura las credenciales de MercadoPago
const paymenntsControllers = {

    // Función para crear una preferencia de pago en MercadoPago
     createPaymentPreference:  async function(req, res )  {
      // const { name, price, unit } = req.body; 
      mercadopago.configure({
        access_token: MP_TOKEN
      });
      const id_orden= 1

    compra = req.body;
      const items =[
        {  
          id:compra[0].id,
           title: compra[0].title,
           currency_id: 'ARS',
           unit_price:Number(compra[0].unit_price),
           quantity: 1
      },
     {  
          id:compra[1].id,
          title: compra[1].title,
          currency_id: 'ARS',
          unit_price:Number(compra[1].unit_price),
          quantity: 1
},
{  
          id:compra[2].id,
          title: compra[2].title,
          currency_id: 'ARS',
          unit_price:Number(compra[2].unit_price),
          quantity: 1
},

  ] 
  const totalPrecio = items.reduce((acumulador, producto) =>
  acumulador + producto.unit_price, 0);
      const preference = {
        items,
        total_amount:totalPrecio,
        external_reference : `${id_orden}`,
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
        init_point = response.body.init_point;
        projects = response.body.items.map(e=>{
          return{
            id:e.id,
            title:e.title,
            price:e.unit_price,
          }
        })
        const totalPrecio = items.reduce((acumulador, producto) =>
        acumulador + producto.unit_price, 0);
        const orderDb = await Payments.create({
          paymentId:global.id,
          status:"created",
          projects:projects,
          paymentAmount:totalPrecio,
          })
        
          
          console.log(orderDb)
          res.json({id: global.id, init_point: response.body.init_point, orderDb})
        
      } catch (error) {
        console.log(error);
      }
    },
        // res.json({
        //   id_mercadopago: global.id,
        //   init_point: response.body.init_point,
        //   items: response.body.items,
        //   back_urls: response.body.back_urls,
        //   total_amount:totalPrecio
        // });
        
    getOrdenId: async function(req, res){
    try {
      const {id} = req.params
      const  payment = await paymentsServices.paymentId(id);
          res.status(200).json(payment);
      } catch (error) {
          res.status(500).json(error.message);
      }
    },
    getAllPayment: async function(req, res){
      try {
        const paymentsData = req.body;
        const allPayments = await paymentsServices.allPayments(paymentsData);
          res.status(200).json(allPayments)
      } catch (error) {
          res.status(500).json(error.message)
      }

    }
  };
        
     module.exports =  paymenntsControllers 