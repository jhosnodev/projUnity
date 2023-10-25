const { DataTypes } = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define("Requests",{
        RequestId:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },        
        UserId:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        Status:{
            type: DataTypes.ENUM('create', 'process'),
            default: true,
        },
        Description:{
            type: DataTypes.STRING,
            default: true
        },
        tags:{
            type: DataTypes.STRING,
            default: true
        },
        title:{
            type: DataTypes.STRING,
            default: true
        },
        location:{
            type: DataTypes.STRING,
            default: true
        },
        date:{
            type: DataTypes.DATE,
            default: true
        },
    },
    {
        timestamps: true,
        freezeTableName: true
    })
}