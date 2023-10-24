const Services = require('../services')
const MercadoPagoController = require('./mercadopago');

const orderControllers = {
    getOrder: async function(req, res) {
        try {
            const allOrders = await Services.allOrders(req.query)
            res.status(200).json(allOrders)
        } catch (error) {
            res.status(500).json(error.message)
        }
    },
    getOrderID: async function(req, res) {
        try {
            const { id } = req.params
            const orderDetail = await Services.orderServices.orderId(id)
            res.status(200).json(orderDetail)
        } catch (error) {
            res.status(500).json(error.message)
        }
    },
    putOrder: async function(req, res) {
        try {
            const orderId = req.params.id;
            const orderData = req.body;

            const updatedOrder = await Services.orderServices.updateOrder(
                orderId,
                orderData
            );

            res.status(200).json(updatedOrder);
            console.log(updatedOrder);
        } catch (error) {
            res.status(500).json(error.message);
        }
    },

    deleteOrder: async function(req, res) {
        try {
            const orderId = req.params.id;

            const result = await Services.orderServices.deleteOrder(orderId);

            res.status(200).json(result);
        } catch (error) {
            res.status(500).json(error.message);
        }
    },
    createPayment: async function(req, res) {
        try {
            const { orderId } = req.params;
            const order = await Services.orderServices.orderId(orderId);

            // Utiliza la función del controlador de MercadoPago para crear la preferencia de pago
            const paymentPreference = await MercadoPagoController.createPayment(order);

            res.status(200).json(paymentPreference);
        } catch (error) {
            res.status(500).json(error.message);
        }
    },
    createNewOrder: async function(req, res) {
        try {
                
            const orderData = req.body;
            const post = {
                ...orderData,

            };
            console.log(orderData);

            const newOrder = await Services.orderServices.createOrder(post);
            res.status(200).json(newOrder);
            console.log(newOrder);
        } catch (error) {
            res.status(500).json(error.message);
        }

    },
};




module.exports = orderControllers;