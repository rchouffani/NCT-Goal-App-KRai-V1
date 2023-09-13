const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const goals = sequelize.define(
    'goals',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      Date: {
        type: DataTypes.DATE,
      },

      Due_Date: {
        type: DataTypes.DATE,
      },

      Goal_Number: {
        type: DataTypes.DECIMAL,
      },

      Goal_UOM: {
        type: DataTypes.TEXT,
      },

      Period: {
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

  goals.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.goals.belongsTo(db.opco, {
      as: 'OpCo',
      foreignKey: {
        name: 'OpCoId',
      },
      constraints: false,
    });

    db.goals.belongsTo(db.category, {
      as: 'Category',
      foreignKey: {
        name: 'CategoryId',
      },
      constraints: false,
    });

    db.goals.belongsTo(db.goal_type, {
      as: 'Goal_Type',
      foreignKey: {
        name: 'Goal_TypeId',
      },
      constraints: false,
    });

    db.goals.belongsTo(db.goal_number_direction, {
      as: 'Goal_Number_Direction',
      foreignKey: {
        name: 'Goal_Number_DirectionId',
      },
      constraints: false,
    });

    db.goals.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.goals.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return goals;
};
