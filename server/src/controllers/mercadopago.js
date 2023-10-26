const mercadopago = require("mercadopago");
const { MP_TOKEN, DB_HOST, CLIENT_HOST } = process.env;
// const { Order_detail, Order, Payments, Users } = require("../db.js");
const paymentsServices = require("../services/payment.js");
const { Sequelize } = require("sequelize");
const { projects } = require("../utils/index.js");
// const mercadopago = require('mercadopago');

const { Order_detail , Order, Payments, Users, Projects } = require('../db.js');
// const paymentsServices = require('../services/payment.js');
// const {Sequelize} = require('sequelize');

// Configura las credenciales de MercadoPago
const paymenntsControllers = {
  // Función para crear una preferencia de pago en MercadoPago
  createPaymentPreference: async function (req, res) {
    // const { items, payer, concepto, status } = req.body;
    mercadopago.configure({
      access_token: MP_TOKEN,
    });
    //const id_orden= 1
    const orderNumber = await Payments.findAll({
      attributes: [Sequelize.fn("max", Sequelize.col("orderNumber"))],
      raw: true,
    });
    compra = req.body;
    items = compra.map((item) => {
      return {
        buyer: item.buyer,
        id: item.id,
        title: item.title,
        currency_id: "ARS",
        unit_price: Number(item.unit_price),
        quantity: 1,
      };
    });
    /* [
      {  
        buyer:compra[0].UserId,
        id:compra[0].projectId,
         title: compra[0].title,
         currency_id: 'ARS',
         unit_price:Number(compra[0].unit_price),
         quantity: 1,
        
    },
   {  
        buyer:compra[1].UserId,
        id:compra[1].projectId,
        title: compra[1].title,
        currency_id: 'ARS',
        unit_price:Number(compra[1].unit_price),
        quantity: 1,
       
},
{  
        buyer:compra[2].UserId,
        id:compra[2].projectId,  
        title: compra[2].title,
        currency_id: 'ARS',
        unit_price:Number(compra[2].unit_price),
        quantity: 1,
        
}, 
    ]*/
console.log(items);

    const preference = {
      items,
      total_amount: 1,
      external_reference: `${orderNumber[0].max + 1}`,
      back_urls: {
        success: "http://localhost:3001/createPayment/succes",
        pending: `${CLIENT_HOST}/error`,
        failure: `${CLIENT_HOST}/pending`,
      },
      notification_url: "https://3eb3-181-29-72-133.ngrok.io/webhook",
      auto_return: "approved",
    };
      try {
        const response = await mercadopago.preferences.create(preference);
        //console.log(response.body);

        global.id = response.body.id;
        init_point = response.body.init_point;
        projects = response.body.items.map(e=>{
          return{
            id:e.id,
            price:e.unit_price
          }
        })


        for (let i in projects) {
          await Payments.update(
            {
              paymentId: global.id,
              status:"created",
            },
            {
              where: {
                orderNumber: orderNumber,
                product: projects[i].id
            }
          });
        }
        const queryOrder = await Payments.findAll({where: {orderNumber: orderNumber}, raw: true})
        let itemsDb = []
        for (let i in queryOrder) {
          let { product, paymentAmount} = queryOrder[i]
          let productName = await Projects.findOne({where: {id: product}, attributes: ['name'], raw: true})
          itemsDb = [
            ...itemsDb,
            {
              id: product,
              title: productName.name,
              unit_price: paymentAmount,
              quantity: 1
            }
          ] 
        }

        res.json({id: global.id, init_point: response.body.init_point, itemsDb})
        
      } catch (error) {
        console.log(error);
      }
  },

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
      const { desde, hasta } = req.query
      const currentTime = new Date()
      let fechaDesde = desde? desde.split('-') : [];
      fechaDesde.length !== 3?         
          fechaDesde = new Date(currentTime.getFullYear(),currentTime.getMonth(),1,0,0,0)
          : fechaDesde = new Date(parseInt(desde[0]),parseInt(desde[1])-1,parseInt(desde[2]),0,0,0); //<<--- si no esta definida la fecha desde, se define por defecto desde el primero del corriente mes
      
      let fechaHasta = hasta? hasta.split('-') : [];
      fechaHasta.length !== 3? 
          fechaHasta = currentTime
          : fechaHasta = new Date(parseInt(hasta[0]),parseInt(hasta[1])-1,parseInt(hasta[2]),0,0,0);
      
          const allPayments = await paymentsServices.allPayments({...req.query, desde: fechaDesde, hasta: fechaHasta});
        res.status(200).json(allPayments)
    } catch (error) {
        res.status(500).json(error.message)
    }
  }
};
        
module.exports =  paymenntsControllers
