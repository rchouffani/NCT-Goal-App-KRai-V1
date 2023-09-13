const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const goal_number_direction = sequelize.define(
    'goal_number_direction',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      Goal_Number_Direction: {
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

  goal_number_direction.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.goal_number_direction.hasMany(db.goals, {
      as: 'goals_Goal_Number_Direction',
      foreignKey: {
        name: 'Goal_Number_DirectionId',
      },
      constraints: false,
    });

    //end loop

    db.goal_number_direction.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.goal_number_direction.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return goal_number_direction;
};
