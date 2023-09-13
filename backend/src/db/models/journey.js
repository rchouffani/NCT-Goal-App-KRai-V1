const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const journey = sequelize.define(
    'journey',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      journey: {
        type: DataTypes.TEXT,
      },

      Journey_Date: {
        type: DataTypes.DATE,
      },

      Journey_Status: {
        type: DataTypes.ENUM,

        values: ['Completed', 'Canceled', 'Pending'],
      },

      Journey_Type: {
        type: DataTypes.TEXT,
      },

      End_Date: {
        type: DataTypes.DATE,
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

  journey.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.journey.belongsTo(db.opco, {
      as: 'OpCo',
      foreignKey: {
        name: 'OpCoId',
      },
      constraints: false,
    });

    db.journey.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.journey.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return journey;
};
