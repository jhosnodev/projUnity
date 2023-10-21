const { Projects, Order, Order_detail } = require('../db.js'); // Importa tus modelos de órdenes
const { Op } = require('sequelize');
const Controllers = require("./index.js")

const paymentsServices = {
    
    allOrders: async function(query) {
        try {
            const { status, payment_id, payment_status, merchant_order_id } = query;
            const orders = await Order.findAll({
                where: {
                    status: status || {
                        [Op.ne]: null
                    },
                    payment_id: payment_id || {
                        [Op.ne]: null
                    },
                    payment_status: payment_status || {
                        [Op.ne]: null
                    },
                    merchant_order_id: merchant_order_id || {
                        [Op.ne]: null
                    },
                },
            });

            return orders;
        } catch (error) {

            console.error('Error al obtener órdenes:', error);
            throw error;
        }
    },

    orderId: async function(id) {
        try {
            const order = await Order.findByPk(id);
            return order;
        } catch (error) {

            console.error('Error al obtener la orden por ID:', error);
            throw error;
        }
    },


    createOrder: async function(req, res) {
        try {
            // const { orderId } = req.params;
            // const order = await Services.paymentPreference.orderId(orderId);
            
            // const paymentPreference = await Controllers.createPaymentPreferences(order);
       
            
           
        
           
                return paymentPreference
           


        }catch(error){
            console.error('Error al obtener órdenes:', error);
        }
    }
        // })
        // .then(response => {
        //     Promise.all(
        //     orderlines.map(elem => {
        //         Projects.findByPk( elem.id)
        //           .then(producto =>{
        //             const orderId = response.dataValues.id //nos da el id de order
                    
                    // return Order_detail.create({
                    //     orderId: orderId,
                    //     productId: producto.id,
                    //     quantity: elem.quantity,
                    //     price: producto.price
                    // })
             
            //         .then(secondResponse => { //nos da el arreglo creado
            //             const cant = secondResponse.dataValues.quantity
            //             const prodId = secondResponse.dataValues.productId
            //             // Product.decrement(
            //             //     {stock: cant},
            //             //     { where: { id: prodId } }
            //             // )
            //         })
            //     })
            // )
          
            
        // })
  

    // updateOrder: async function(orderId, orderData) {
    //     try {

    //         const order = await Order.findByPk(orderId);
    //         if (!order) {
    //             throw new Error('La orden no se encontró');
    //         }

    //         await order.update(orderData);

    //         return order;
    //     } catch (error) {

    //         console.error('Error al actualizar la orden:', error);
    //         throw error;
    //     }
    // },
};

module.exports = paymentsServices;