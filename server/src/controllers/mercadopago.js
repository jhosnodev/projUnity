const mercadopago = require('mercadopago');
const {MP_TOKEN, DB_HOST} = process.env
const { Order_detail , Order, Payments, Users, Projects } = require('../db.js');
const paymentsServices = require('../services/payment.js');
const {Sequelize} = require('sequelize');
const { projects } = require('../utils/index.js');


// Configura las credenciales de MercadoPago
const paymenntsControllers = {

    // Función para crear una preferencia de pago en MercadoPago
  createPaymentPreference:  async function(req, res )  {
    // const { items, payer, concepto, status } = req.body; 
    mercadopago.configure({
      access_token: MP_TOKEN
    });
   
    const lastOrderNumber = await Payments.findAll({
      attributes: [Sequelize.fn('max', Sequelize.col('orderNumber'))],
      raw: true
    })
    compra = req.body
    items = [
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
    ]
    const preference = {
      items,
      total_amount: 1,
      external_reference : `${orderNumber[0].max+1}`,
      back_urls: {
        success: "http://localhost:3001/createPayment/succes",
        pending: `${DB_HOST}/error`,
        failure: `${DB_HOST}/pending`,
      },
      notification_url: "https://3eb3-181-29-72-133.ngrok.io/webhook",
      auto_return: "approved" 
    };
    // console.log(preference)
      try {
        const response = await mercadopago.preferences.create(preference);
        // console.log(response.body);
        global.id = response.body.id;
        init_point = response.body.init_point;
       const totalPrecio = items.reduce((acumulador, producto) =>
      acumulador + parseFloat(producto.unit_price), 0);
        
     console.log(items)

    const orderNumber = lastOrderNumber[0].max+1

    for (let i in items) {
      const createOrder = await Payments.create({
        paymentAmount: items[i].unit_price,
        orderNumber: orderNumber,
        product: items[i].id,
        buyer: payer,
        concept: concepto? concepto : 'venta', //venta, donacion o devolucion
        status: status? status : 'processing',
      })
    }

    // const items = [
    //   {  
    //     id: projectId,
    //     title: title,
    //     unit_price:Number(unit_price),
    //     quantity: 1
    //   },
    // ] 
    // const totalPrecio = items.reduce((acumulador, producto) =>
    //   acumulador + parseFloat(producto.unit_price), 0);

    const preference = {
      items,
      total_amount: totalPrecio,
      external_reference : `${orderNumber}`,
      payer: await Users.findOne({
        where: {id: payer},
        attributes: ['name', 'email'],
        raw: true
      }),
      // payer: {
      //   name: "Lalo",
      //   surname: "Landa",
      //   email: "test_user_63274575@testuser.com",
      // },
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
        // console.log(response.body);

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
              name: productName.name,
              unit_price: paymentAmount,
              quantity: 1
            }
          ] 
        }

        res.json({id: global.id, init_point: response.body.init_point, itemsDb})
        
      } catch (error) {
        console.log(error);
      }
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