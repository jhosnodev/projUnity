const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Category', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
)};