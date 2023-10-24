const mercadopago = require("mercadopago");
const { MP_TOKEN, DB_HOST, CLIENT_HOST } = process.env;
const { Order_detail, Order, Payments, Users } = require("../db.js");
const paymentsServices = require("../services/payment.js");
const { Sequelize } = require("sequelize");
const { projects } = require("../utils/index.js");

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
    // console.log(preference)
    try {
      const response = await mercadopago.preferences.create(preference);
      // console.log(response.body);
      global.id = response.body.id;
      init_point = response.body.init_point;
      const totalPrecio = items.reduce(
        (acumulador, producto) => acumulador + parseFloat(producto.unit_price),
        0
      );

      console.log(items);

      const orderDb = await Payments.create({
        paymentId: global.id,
        status: "created",
        orderNumber: orderNumber[0].max + 1,
        buyer: 1,
        projects: 1,
        paymentAmount: totalPrecio,
      });

      // console.log(orderDb)
      res.json({
        id: global.id,
        init_point: response.body.init_point,
        orderDb,
      });
    } catch (error) {
      console.log(error);
    }
  },

  // falta relacionar las nuevas compras con projectId y userId

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

  // res.json({
  //   id_mercadopago: global.id,
  //   init_point: response.body.init_point,
  //   items: response.body.items,
  //   back_urls: response.body.back_urls,
  //   total_amount:totalPrecio
  // });

  getOrdenId: async function (req, res) {
    try {
      const { id } = req.params;
      const payment = await paymentsServices.paymentId(id);
      res.status(200).json(payment);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
  getAllPayment: async function (req, res) {
    try {
      const paymentsData = req.body;
      const allPayments = await paymentsServices.allPayments(paymentsData);
      res.status(200).json(allPayments);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
};

module.exports = paymenntsControllers;
