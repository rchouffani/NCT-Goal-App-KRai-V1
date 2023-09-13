const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const opco_address = sequelize.define(
    'opco_address',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      Street: {
        type: DataTypes.TEXT,
      },

      City: {
        type: DataTypes.TEXT,
      },

      ZipCode: {
        type: DataTypes.TEXT,
      },

      Country: {
        type: DataTypes.TEXT,
      },

      Head_Quarter: {
        type: DataTypes.BOOLEAN,

        allowNull: false,
        defaultValue: false,
      },

      Long: {
        type: DataTypes.TEXT,
      },

      latit: {
        type: DataTypes.TEXT,
      },

      Address_Name: {
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

  opco_address.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.opco_address.belongsTo(db.opco, {
      as: 'OpCo',
      foreignKey: {
        name: 'OpCoId',
      },
      constraints: false,
    });

    db.opco_address.belongsTo(db.address_state, {
      as: 'address_state',
      foreignKey: {
        name: 'address_stateId',
      },
      constraints: false,
    });

    db.opco_address.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.opco_address.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return opco_address;
};
