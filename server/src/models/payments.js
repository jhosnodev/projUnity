const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Payment', {
        // Los atributos del modelo se definen aquí
        paymentId: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        ProjectId: {
            type: DataTypes.INTEGER,
            references: {
                // Este es un ejemplo de referencia a otro modelo
                model: 'Projects',
                key: 'ProjectId'
            }
        },
        UserId: {
            type: DataTypes.INTEGER,
            references: {
                // Este es otro ejemplo de referencia a otro modelo
                model: 'Users',
                key: 'UserId'
            }
        },
        PaymentAmount: {
            type: DataTypes.DECIMAL(11, 2)
        },
        type: {
            type: DataTypes.STRING
        },
        ColaborationDate: {
            type: DataTypes.DATE
        }
    });
}