const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const opco = sequelize.define(
    'opco',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      OpCo_Name: {
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

  opco.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.opco.hasMany(db.customer, {
      as: 'customer_OpCo',
      foreignKey: {
        name: 'OpCoId',
      },
      constraints: false,
    });

    db.opco.hasMany(db.opco_address, {
      as: 'opco_address_OpCo',
      foreignKey: {
        name: 'OpCoId',
      },
      constraints: false,
    });

    db.opco.hasMany(db.opco_contact, {
      as: 'opco_contact_OpCo',
      foreignKey: {
        name: 'OpCoId',
      },
      constraints: false,
    });

    db.opco.hasMany(db.goals, {
      as: 'goals_OpCo',
      foreignKey: {
        name: 'OpCoId',
      },
      constraints: false,
    });

    db.opco.hasMany(db.journey, {
      as: 'journey_OpCo',
      foreignKey: {
        name: 'OpCoId',
      },
      constraints: false,
    });

    //end loop

    db.opco.hasMany(db.file, {
      as: 'Logo',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: db.opco.getTableName(),
        belongsToColumn: 'Logo',
      },
    });

    db.opco.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.opco.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return opco;
};
