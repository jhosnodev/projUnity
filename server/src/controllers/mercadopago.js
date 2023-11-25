const mercadopago = require('mercadopago');
const {MP_TOKEN, DB_HOST} = process.env
const { Order_detail , Order, Payments, Users, Projects } = require('../db.js');
const paymentsServices = require('../services/payment.js');
const {Sequelize} = require('sequelize');

// Configura las credenciales de MercadoPago
const paymenntsControllers = {

    // Función para crear una preferencia de pago en MercadoPago
  createPaymentPreference:  async function(req, res )  {
    try {
    mercadopago.configure({
      access_token: MP_TOKEN,
    });
   
    const lastOrderNumber = await Payments.findAll({
      attributes: [Sequelize.fn('max', Sequelize.col('orderNumber'))],
      raw: true
    })

    const orderNumber = lastOrderNumber[0].max+1
    let items = req.body
    for (let i in items) {
      const createOrder = await Payments.create({
        paymentAmount: items[i].unit_price,
        orderNumber: orderNumber,
        product: items[i].id,
        buyer: items[i].buyer,
        concept: items[i].concept? items[i].concept : 'venta', //venta, donacion o devolucion
        status: items[i].status? items[i].status : 'created',
      })
    }

    const totalPrecio = req.body.reduce((acumulador, producto) =>
      acumulador + parseFloat(producto.unit_price), 0);

    const currentTime= new Date()
    const preference = {
      items,
      total_amount: totalPrecio,
      statement_descriptor: "ProjUnity",
      date_of_expiration: new Date(currentTime.getFullYear(),currentTime.getMonth(),currentTime.getDate()+2,0,0,0),
      external_reference : `${orderNumber}`,
      payer: await Users.findOne({
        where: {id: items[0].buyer},
        attributes: ['name', 'email'],
        raw: true
      }),
      back_urls: {
        //success: "https://proj-unity.vercel.app",
        success: "http://localhost:3001/payment/success",
        pending: `${DB_HOST}:3001/payment/error`,
        failure: `${DB_HOST}:3001/payment/pending`,
      },
      notification_url: "https://3eb3-181-29-72-133.ngrok.io/webhook",
      //notification_url: "http://localhost:3001/payment/success",
      auto_return: "approved",
      redirect_urls: {
        failure: '',
        pending: '',
        success: 'http://localhost:3000/',
      },
      
    };
      
        const response = await mercadopago.preferences.create(preference);
        // console.log('response.body es ', response.body);
        // console.log('response es \n', Object.keys(response))
        return await this.createPayment(response)
      } catch (error) {
        console.log(error);
        return error
      }
  },
  createPayment: async function (response) {
    try {

      let global_id = response.body.id;
      let init_point = response.body.init_point;
      let projects = response.body.items.map(e=>{
        return{
          id: e.id,
          price: e.unit_price
        }
      })
      for (let i in projects) {
        await Payments.update(
          {
            paymentId: global_id,
            status:"processing",
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

      res.json({id: global_id, init_point, itemsDb})
    } catch (error) {
      return error
    }

  }
  ,
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
