const { Sequelize, DataTypes, STRING } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Payments', {
        // Los atributos del modelo se definen aquí
        paymentId: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        paymentAmount: {
            type: DataTypes.DECIMAL(11, 2)
        },
        status:{
            type: DataTypes.ENUM('carrito', 'created', 'processing', 'cancelled', 'completed'),
            allowNull: false
        },
        projects:{
            type:DataTypes.ARRAY(STRING)
        }
    },
    {
        timestamps: true,
        freezeTableName: true
    }
    );
}