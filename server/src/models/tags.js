const {DataTypes} = require('sequelize');

module.exports = (sequelize) => { 
    sequelize.define('Tags', {
        name:{
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
    );
}