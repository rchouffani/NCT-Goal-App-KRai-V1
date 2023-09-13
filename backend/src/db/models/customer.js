const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const customer = sequelize.define(
    'customer',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      Customer_Name: {
        type: DataTypes.TEXT,
      },

      Customer_id_CW: {
        type: DataTypes.INTEGER,
      },

      Customer_id_Other: {
        type: DataTypes.TEXT,
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  customer.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.customer.belongsTo(db.opco, {
      as: 'OpCo',
      foreignKey: {
        name: 'OpCoId',
      },
      constraints: false,
    });

    db.customer.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.customer.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return customer;
};
