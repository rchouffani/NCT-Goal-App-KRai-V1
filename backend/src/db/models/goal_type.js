const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const goal_type = sequelize.define(
    'goal_type',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      Goal_Type: {
        type: DataTypes.TEXT,
      },

      Goal_Type_Details: {
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

  goal_type.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.goal_type.hasMany(db.goals, {
      as: 'goals_Goal_Type',
      foreignKey: {
        name: 'Goal_TypeId',
      },
      constraints: false,
    });

    //end loop

    db.goal_type.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.goal_type.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return goal_type;
};
