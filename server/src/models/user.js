const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Users', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    msg: "Must be a valid email address"
                }
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            validate: {
                isUrl: true
            },
        },
        active: {
            type: DataTypes.BOOLEAN,
            default: true,
        },
        twitterUser: {
            type: DataTypes.STRING,
        },
        emailUser: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                isEmail: {
                    msg: "Must be a valid email address"
                }
            },
        },
        githubUser: {
            type: DataTypes.STRING,
            unique: true
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    });
};