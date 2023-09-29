const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('UserTypes', {
    name: {
        type: DataTypes.STRING,
        unique: true
    },
    createProject: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    editProject: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    manageUsers: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    managePayments: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
},
  {
    timestamps: false,
    freezeTableName: true
  });
};