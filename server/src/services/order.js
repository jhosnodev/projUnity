const { Projects, Order, Order_detail } = require('../db.js'); // Importa tus modelos de órdenes
const { Op } = require('sequelize');

const OrderServices = {
    
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


    createOrder: async function(orderData) {
        try {
            const newOrder = await Order.create(orderData);
            return newOrder;
        } catch (error) {

            console.error('Error al crear la orden:', error);
            throw error;
        }
    },

    updateOrder: async function(orderId, orderData) {
        try {

            const order = await Order.findByPk(orderId);
            if (!order) {
                throw new Error('La orden no se encontró');
            }

            await order.update(orderData);

            return order;
        } catch (error) {

            console.error('Error al actualizar la orden:', error);
            throw error;
        }
    },
};

module.exports = OrderServices;