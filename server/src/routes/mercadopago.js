const { Order_detail , Order} = require('../db.js');

const {
    PROD_ACCESS_TOKEN,
    Application_ID,
  } = process.env;

const BASE_URL = process.env.NODE_BASE_URL ? process.env.NODE_BASE_URL : 'http://localhost:3000' 
const BASE_BACK = process.env.NODE_BASE_BACK ? process.env.NODE_BASE_BACK : 'http://localhost:3001' 

const server = require('express').Router();
  // SDK de Mercado Pago
const mercadopago = require ('mercadopago');
const { route } = require('./order');

server.get("/", (req, res, next)=>{
  //const id_orden = req.query.id 

  const id_orden= 1
  // cargamos el carrido de la bd
  const carrito = [
    {title: "Producto 1", quantity: 5, price: 10.52},
    {title: "Producto 2", quantity: 15, price: 100.52},
    {title: "Producto 3", quantity: 6, price: 200}
  ]
  // Agrega credenciales
mercadopago.configure({
    access_token: PROD_ACCESS_TOKEN
  });
  
  console.info('ml configured')
  const items_ml = carrito.map(i => ({
    title: i.title,
    unit_price: i.price,
    quantity: i.quantity,
  }))
  console.info('carrito', items_ml)
  // Crea un objeto de preferencia
  let preference = {
    items: items_ml,
    external_reference : `${id_orden}`, //`${new Date().valueOf()}`,
    back_urls: {
      success: `${BASE_BACK}/mercadopago/pagos`,
      failure: `${BASE_BACK}/mercadopago/pagos`,
      pending: `${BASE_BACK}/mercadopago/pagos`,
    },
    //marketplace: Application_ID,
   /* marketplace_fee: 2.56,
    payer: {
      id: 699750543,
      nickname: "TESTR7BARI7Y"
    }*/
  };
  console.info('preference:', preference)
  mercadopago.preferences.create(preference)

  .then(function(response){
    console.info('respondio')
  // Este valor reemplazará el string"<%= global.id %>" en tu HTML
    global.id = response.body.id;
    console.log(response.body)
    res.json({id: global.id, init_point: response.body.init_point});
  }).catch(function(error){
    console.log(error);
  })


}) 

server.get("/pagos/:id", (req, res)=>{
  const mp = new mercadopago (PROD_ACCESS_TOKEN)
  const id = req.params.id
  console.info("Buscando el id", id)
  mp.get(`/v1/payments/search`, {'status': 'pending'})//{"external_reference":id})
  .then(resultado  => {
    console.info('resultado', resultado)
    res.json({"resultado": resultado})
  })
  .catch(err => {
    console.error('No se consulto:', err)
    res.json({
      error: err
    })
  })

})

server.get("/pagos", (req, res)=>{
  console.info("EN LA RUTA PAGOS ", req)
  const payment_id= req.query.payment_id
  const payment_status= req.query.status
  const external_reference = req.query.external_reference
  const merchant_order_id= req.query.merchant_order_id
  console.log("EXTERNAL REFERENCE ", external_reference)

  //Aquí edito el status de mi orden

  Order.findByPk(external_reference)
  .then((order) => {
    order.payment_id= payment_id
    order.payment_status= payment_status
    order.merchant_order_id = merchant_order_id
    order.status = "created"
    console.info('Salvando order')
    order.save()
    .then((_) => {
      console.info('redirect success')
      
      return res.redirect(`${BASE_URL}`)
    }).catch((err) =>{
      console.error('error al salvar', err)
      return res.redirect(`${BASE_URL}/?error=${err}&where=al+salvar`)
    })
  }).catch(err =>{
    console.error('error al buscar', err)
    return res.redirect(`${BASE_URL}/?error=${err}&where=al+buscar`)
  })


  //proceso los datos del pago 
  // redirijo de nuevo a react con mensaje de exito, falla o pendiente
  //res.send(`${payment_id} ${payment_status} ${external_reference} ${merchant_order_id} `)
})


module.exports = server;