const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const initiative = sequelize.define(
    'initiative',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      Initiative: {
        type: DataTypes.TEXT,
      },

      Initiative_Details: {
        type: DataTypes.TEXT,
      },

      Start_Date: {
        type: DataTypes.DATE,
      },

      End_Date: {
        type: DataTypes.DATE,
      },

      Disabled_Status: {
        type: DataTypes.BOOLEAN,

        allowNull: false,
        defaultValue: false,
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

  initiative.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.initiative.hasMany(db.top_category, {
      as: 'top_category_Initiative',
      foreignKey: {
        name: 'InitiativeId',
      },
      constraints: false,
    });

    //end loop

    db.initiative.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.initiative.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return initiative;
};
