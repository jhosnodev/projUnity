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
            }
        },
        {
            timestamps: true,
            freezeTableName: true
        }
    );
}
