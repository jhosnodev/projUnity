const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Payments', {
        // Los atributos del modelo se definen aquí
        // paymentId: {
        //     type: DataTypes.INTEGER,
        //     primaryKey: true
        // },
        // ProjectId: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         // Este es un ejemplo de referencia a otro modelo
        //         model: 'Projects',
        //         key: 'ProjectId'
        //     }
        // },
        // UserId: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         // Este es otro ejemplo de referencia a otro modelo
        //         model: 'Users',
        //         key: 'UserId'
        //     }
        // },
        PaymentAmount: {
            type: DataTypes.DECIMAL(11, 2)
        },
        type: {
            type: DataTypes.ENUM('ingreso','egreso'),
            allowNull: false
        },
        concept: {
            type: DataTypes.ENUM('venta','donacion','devolucion'),
            allowNull: false
        },
        orderNumber: {
            type: DataTypes.DECIMAL(8),
            allowNull: false
        }
    },
    {
        timestamps: true,
        freezeTableName: true
    }
    );
}