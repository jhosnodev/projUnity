const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Payments', {
        // Los atributos del modelo se definen aquí
        paymentId: {
            type: DataTypes.STRING,
        },
        paymentAmount: {
            type: DataTypes.DECIMAL(11, 2)
        },
        status:{
            type: DataTypes.ENUM('carrito', 'created', 'processing', 'cancelled', 'completed'),
            allowNull: false
        },
        concept: {
            type: DataTypes.ENUM('venta','donacion','devolucion'),
            defaultValue: 'venta'
        },
        projects:{
            type:DataTypes.ARRAY(DataTypes.JSON)
        }
    },
    {
        timestamps: true,
        freezeTableName: true
    }
    );
}