const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('Ratings', {
            
            rating: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
    
            comment: {
                type: DataTypes.STRING,
                allowNull: false,
            },
    
            score: {
                type: DataTypes.STRING,
                allowNull: false,
            },
    
            creationDate: {
                type: DataTypes.DATE,
                allowNull: false,
            },
    
            updateDate: {
                type: DataTypes.DATE,
                allowNull: false,
            },
    
            timestapms : false,
        
        });

}
