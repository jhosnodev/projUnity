const {DataTypes} = require('sequelize');

module.exports = (sequelize) => { 
    sequelize.define('Images', {                
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        imageurl:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        public_id:{
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: false,
        freezeTableName: true
    }
    );
}