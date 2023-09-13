const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const opco_contact = sequelize.define(
    'opco_contact',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      First_Name: {
        type: DataTypes.TEXT,
      },

      Last_Name: {
        type: DataTypes.TEXT,
      },

      Title: {
        type: DataTypes.TEXT,
      },

      Email: {
        type: DataTypes.TEXT,
      },

      Status: {
        type: DataTypes.BOOLEAN,

        allowNull: false,
        defaultValue: false,
      },

      Full_Name: {
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

  opco_contact.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.opco_contact.belongsTo(db.opco, {
      as: 'OpCo',
      foreignKey: {
        name: 'OpCoId',
      },
      constraints: false,
    });

    db.opco_contact.belongsTo(db.users, {
      as: 'user',
      foreignKey: {
        name: 'userId',
      },
      constraints: false,
    });

    db.opco_contact.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.opco_contact.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return opco_contact;
};
