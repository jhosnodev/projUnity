const { DataTypes } = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define("Comments",{        
        id:{
            type:DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull:false,
            primaryKey: true,
            unique: false
        },
        image:{
            type:DataTypes.STRING,
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
        belongToProyect:{
            type: DataTypes.BOOLEAN,
            default: true
        }
    },
    {
        timestamps: true,
        freezeTablename: true
    }
    )
}