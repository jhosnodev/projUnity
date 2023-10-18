const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('UsersTerceros', {
        provider: {
            type: DataTypes.STRING
        },
        user_id: {
            type: DataTypes.INTEGER
        },
        subject: {
            type: DataTypes.STRING
        }
    },
        {
            timestamps: true,
            freezeTableName: true
        });
    };