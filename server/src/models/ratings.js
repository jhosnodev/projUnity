const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
   sequelize.define('Ratings', {
            score:{               
               type:DataTypes.FLOAT,
               validate:{
                   min:1.0,
                   max:5                  
                },
            },
            comment: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        }
    );
}