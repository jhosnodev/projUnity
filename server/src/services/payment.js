const { Projects, Payments} = require('../db.js'); // Importa tus modelos de órdenes
const { Op, Sequelize } = require('sequelize');
const Controllers = require("./index.js")

const paymentsServices = {
    
    allPayments: async function(query) {
        try {
            let {  paymentId, status, paymentAmount, projects, UserId, desde, hasta } = query;

            const {count, rows} = await Payments.findAndCountAll({
                where: {
                    createdAt: {[Op.between]: [desde, hasta]},
                },
                order: [['createdAt', 'DESC']],
                raw: true
            });
            // const orderNumber = await Payments.findAll({
            //     attributes: [Sequelize.fn('max', Sequelize.col('orderNumber'))],
            //     raw: true
            //   })
            
            return rows;
        } catch (error) {

            //console.error('Error al obtener payments:', error);
            throw error;
        }
    },

    paymentId: async function(id) {
        try {
            const order = await Payments.findByPk(id);
            return order;
        } catch (error) {

            console.error('Error al obtener la orden por ID:', error);
            throw error;
        }
    }, // el create payment de mercado pago esta realizado desde /controllers/mercadopago.js 
};

module.exports = paymentsServices;