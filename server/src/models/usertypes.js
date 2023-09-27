const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('UserTypes', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        unique: true
    },
    createProject: {
        type: DataTypes.BOOLEAN,
        default: true
    },
    editProject: {
        type: DataTypes.BOOLEAN,
        default: true
    },
    manageUsers: {
      type: DataTypes.BOOLEAN,
      default: true
    },
    managePayments: {
      type: DataTypes.BOOLEAN,
      default: true
    }
},
  {
    timestamps: false,
    freezeTableName: true
  });
};