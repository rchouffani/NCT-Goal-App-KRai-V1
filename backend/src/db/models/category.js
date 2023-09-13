const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const category = sequelize.define(
    'category',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      Category: {
        type: DataTypes.TEXT,
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

  category.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.category.hasMany(db.goals, {
      as: 'goals_Category',
      foreignKey: {
        name: 'CategoryId',
      },
      constraints: false,
    });

    //end loop

    db.category.belongsTo(db.top_category, {
      as: 'top_category',
      foreignKey: {
        name: 'top_categoryId',
      },
      constraints: false,
    });

    db.category.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.category.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return category;
};
