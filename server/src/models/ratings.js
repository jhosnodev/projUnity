const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
   sequelize.define('Ratings', {
            score:{               
               type:DataTypes.FLOAT,
               validate:{
                   min:1,
                   max:5                  
                },
            },
            comment: {
                type: DataTypes.STRING(500),
            },
        },
        {
            timestamps: true,
            freezeTableName: true
        }
    );
}