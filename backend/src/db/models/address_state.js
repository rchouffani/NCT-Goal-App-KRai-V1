const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const address_state = sequelize.define(
    'address_state',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      State: {
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

  address_state.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.address_state.hasMany(db.opco_address, {
      as: 'opco_address_address_state',
      foreignKey: {
        name: 'address_stateId',
      },
      constraints: false,
    });

    //end loop

    db.address_state.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.address_state.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return address_state;
};
