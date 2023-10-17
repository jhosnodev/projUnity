const mercadopago = require('mercadopago');

// Configura las credenciales de MercadoPago
mercadopago.configure({
    access_token: 'ACCESS_TOKEN',
});

// Función para crear una preferencia de pago en MercadoPago
const createPaymentPreference = async(order) => {
    const preference = {
        items: [{
            id: order.id,
            title: 'Pedido ' + order.id,
            quantity: 1,
            currency_id: 'ARS',
            unit_price: order.totalAmount,
        }, ],

    };

    const response = await mercadopago.preferences.create(preference);
    return response.body.id;
};

module.exports = {
    createPaymentPreference,
};