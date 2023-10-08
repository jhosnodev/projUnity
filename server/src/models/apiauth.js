const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('apiauth', {
    role: {
        type: DataTypes.ENUM('admin','common','guest'),
        unique: true
    },
    GET: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: []
    },
    PUT: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: []
    },
    POST: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: []
    },
    DELETE: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: []
    }
},
{
    timestamps: false,
    freezeTableName: true
});
};