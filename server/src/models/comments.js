const { DataTypes } = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define("Comments",{
        comment:{
            type: DataTypes.STRING(1000),
            comment:"The short comment for the project"
        },        
        image:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        active:{
            type: DataTypes.BOOLEAN,
            default: true,
        },
        replyTo:{
            type: DataTypes.BOOLEAN,
            default: true
        },
    },
    {
        timestamps: true,
        freezeTableName: true
    })
}