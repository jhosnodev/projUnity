const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {

        sequelize.define('Subscription', {

                SubscriptionId: {
                    type: DataTypes.INTEGER,
                    primaryKey: true
                },
                SubscriptionType: {
                    type: DataTypes.STRING
                },
                Price: {
                    type: DataTypes.DECIMAL(11, 2)
                });
        }