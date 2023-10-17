const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Payments', {
        // Los atributos del modelo se definen aquí
        paymentId: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        // ProjectId: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: 'Projects',
        //         key: 'ProjectId'
        //     }
        // },
        // UserId: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: 'Users',
        //         key: 'UserId'
        //     }
        // },
        PaymentAmount: {
            type: DataTypes.DECIMAL(11, 2)
        },
        type: {
            type: DataTypes.STRING
        },
        ColaborationDate: {
            type: DataTypes.DATE
        }
    }, {
        timestamps: true,
        freezeTableName: true
    });
}