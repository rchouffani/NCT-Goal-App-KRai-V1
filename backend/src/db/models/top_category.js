const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const top_category = sequelize.define(
    'top_category',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      Top_Category: {
        type: DataTypes.TEXT,
      },

      Top_Category_Details: {
        type: DataTypes.TEXT,
      },

      Disable_Status: {
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

  top_category.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.top_category.hasMany(db.category, {
      as: 'category_top_category',
      foreignKey: {
        name: 'top_categoryId',
      },
      constraints: false,
    });

    //end loop

    db.top_category.belongsTo(db.initiative, {
      as: 'Initiative',
      foreignKey: {
        name: 'InitiativeId',
      },
      constraints: false,
    });

    db.top_category.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.top_category.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return top_category;
};
