module.exports = {
  /**
   * @param {QueryInterface} queryInterface
   * @param {Sequelize} Sequelize
   * @returns {Promise<void>}
   */
  async up(queryInterface, Sequelize) {
    /**
     * @type {Transaction}
     */
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        'users',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'category',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'top_category',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'customer',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'opco',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'goal_type',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'initiative',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'opco_address',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'opco_contact',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'goals',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'goal_number_direction',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'journey',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'address_state',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'firstName',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'lastName',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'phoneNumber',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'email',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'role',
        {
          type: Sequelize.DataTypes.ENUM,

          values: ['admin', 'user'],
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'disabled',
        {
          type: Sequelize.DataTypes.BOOLEAN,

          defaultValue: false,
          allowNull: false,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'password',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'emailVerified',
        {
          type: Sequelize.DataTypes.BOOLEAN,

          defaultValue: false,
          allowNull: false,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'emailVerificationToken',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'emailVerificationTokenExpiresAt',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'passwordResetToken',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'passwordResetTokenExpiresAt',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'provider',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'Full_Name',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'category',
        'Category',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'category',
        'top_categoryId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'top_category',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'top_category',
        'Top_Category',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'top_category',
        'Top_Category_Details',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'top_category',
        'InitiativeId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'initiative',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'customer',
        'Customer_Name',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'customer',
        'Customer_id_CW',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'customer',
        'Customer_id_Other',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'customer',
        'OpCoId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'opco',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'opco',
        'OpCo_Name',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'goal_type',
        'Goal_Type',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'goal_type',
        'Goal_Type_Details',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'initiative',
        'Initiative',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'initiative',
        'Initiative_Details',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'initiative',
        'Start_Date',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'initiative',
        'End_Date',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'initiative',
        'Disabled_Status',
        {
          type: Sequelize.DataTypes.BOOLEAN,

          defaultValue: false,
          allowNull: false,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'opco_address',
        'Street',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'opco_address',
        'City',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'opco_address',
        'ZipCode',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'opco_address',
        'Country',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'opco_address',
        'OpCoId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'opco',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'opco_address',
        'Head_Quarter',
        {
          type: Sequelize.DataTypes.BOOLEAN,

          defaultValue: false,
          allowNull: false,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'opco_address',
        'Long',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'opco_address',
        'latit',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'opco_address',
        'Address_Name',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'opco_address',
        'address_stateId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'address_state',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'opco_contact',
        'First_Name',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'opco_contact',
        'Last_Name',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'opco_contact',
        'Title',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'opco_contact',
        'Email',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'opco_contact',
        'OpCoId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'opco',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'opco_contact',
        'Status',
        {
          type: Sequelize.DataTypes.BOOLEAN,

          defaultValue: false,
          allowNull: false,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'opco_contact',
        'userId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'users',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'opco_contact',
        'Full_Name',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'goals',
        'OpCoId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'opco',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'goals',
        'CategoryId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'category',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'goals',
        'Goal_TypeId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'goal_type',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'goals',
        'Date',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'goals',
        'Due_Date',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'goals',
        'Goal_Number',
        {
          type: Sequelize.DataTypes.DECIMAL,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'goals',
        'Goal_UOM',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'goals',
        'Period',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'goals',
        'Goal_Number_DirectionId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'goal_number_direction',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'goal_number_direction',
        'Goal_Number_Direction',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'journey',
        'journey',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'address_state',
        'State',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
  /**
   * @param {QueryInterface} queryInterface
   * @param {Sequelize} Sequelize
   * @returns {Promise<void>}
   */
  async down(queryInterface, Sequelize) {
    /**
     * @type {Transaction}
     */
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('address_state', 'State', {
        transaction,
      });

      await queryInterface.removeColumn('journey', 'journey', { transaction });

      await queryInterface.removeColumn(
        'goal_number_direction',
        'Goal_Number_Direction',
        { transaction },
      );

      await queryInterface.removeColumn('goals', 'Goal_Number_DirectionId', {
        transaction,
      });

      await queryInterface.removeColumn('goals', 'Period', { transaction });

      await queryInterface.removeColumn('goals', 'Goal_UOM', { transaction });

      await queryInterface.removeColumn('goals', 'Goal_Number', {
        transaction,
      });

      await queryInterface.removeColumn('goals', 'Due_Date', { transaction });

      await queryInterface.removeColumn('goals', 'Date', { transaction });

      await queryInterface.removeColumn('goals', 'Goal_TypeId', {
        transaction,
      });

      await queryInterface.removeColumn('goals', 'CategoryId', { transaction });

      await queryInterface.removeColumn('goals', 'OpCoId', { transaction });

      await queryInterface.removeColumn('opco_contact', 'Full_Name', {
        transaction,
      });

      await queryInterface.removeColumn('opco_contact', 'userId', {
        transaction,
      });

      await queryInterface.removeColumn('opco_contact', 'Status', {
        transaction,
      });

      await queryInterface.removeColumn('opco_contact', 'OpCoId', {
        transaction,
      });

      await queryInterface.removeColumn('opco_contact', 'Email', {
        transaction,
      });

      await queryInterface.removeColumn('opco_contact', 'Title', {
        transaction,
      });

      await queryInterface.removeColumn('opco_contact', 'Last_Name', {
        transaction,
      });

      await queryInterface.removeColumn('opco_contact', 'First_Name', {
        transaction,
      });

      await queryInterface.removeColumn('opco_address', 'address_stateId', {
        transaction,
      });

      await queryInterface.removeColumn('opco_address', 'Address_Name', {
        transaction,
      });

      await queryInterface.removeColumn('opco_address', 'latit', {
        transaction,
      });

      await queryInterface.removeColumn('opco_address', 'Long', {
        transaction,
      });

      await queryInterface.removeColumn('opco_address', 'Head_Quarter', {
        transaction,
      });

      await queryInterface.removeColumn('opco_address', 'OpCoId', {
        transaction,
      });

      await queryInterface.removeColumn('opco_address', 'Country', {
        transaction,
      });

      await queryInterface.removeColumn('opco_address', 'ZipCode', {
        transaction,
      });

      await queryInterface.removeColumn('opco_address', 'City', {
        transaction,
      });

      await queryInterface.removeColumn('opco_address', 'Street', {
        transaction,
      });

      await queryInterface.removeColumn('initiative', 'Disabled_Status', {
        transaction,
      });

      await queryInterface.removeColumn('initiative', 'End_Date', {
        transaction,
      });

      await queryInterface.removeColumn('initiative', 'Start_Date', {
        transaction,
      });

      await queryInterface.removeColumn('initiative', 'Initiative_Details', {
        transaction,
      });

      await queryInterface.removeColumn('initiative', 'Initiative', {
        transaction,
      });

      await queryInterface.removeColumn('goal_type', 'Goal_Type_Details', {
        transaction,
      });

      await queryInterface.removeColumn('goal_type', 'Goal_Type', {
        transaction,
      });

      await queryInterface.removeColumn('opco', 'OpCo_Name', { transaction });

      await queryInterface.removeColumn('customer', 'OpCoId', { transaction });

      await queryInterface.removeColumn('customer', 'Customer_id_Other', {
        transaction,
      });

      await queryInterface.removeColumn('customer', 'Customer_id_CW', {
        transaction,
      });

      await queryInterface.removeColumn('customer', 'Customer_Name', {
        transaction,
      });

      await queryInterface.removeColumn('top_category', 'InitiativeId', {
        transaction,
      });

      await queryInterface.removeColumn(
        'top_category',
        'Top_Category_Details',
        { transaction },
      );

      await queryInterface.removeColumn('top_category', 'Top_Category', {
        transaction,
      });

      await queryInterface.removeColumn('category', 'top_categoryId', {
        transaction,
      });

      await queryInterface.removeColumn('category', 'Category', {
        transaction,
      });

      await queryInterface.removeColumn('users', 'Full_Name', { transaction });

      await queryInterface.removeColumn('users', 'provider', { transaction });

      await queryInterface.removeColumn(
        'users',
        'passwordResetTokenExpiresAt',
        { transaction },
      );

      await queryInterface.removeColumn('users', 'passwordResetToken', {
        transaction,
      });

      await queryInterface.removeColumn(
        'users',
        'emailVerificationTokenExpiresAt',
        { transaction },
      );

      await queryInterface.removeColumn('users', 'emailVerificationToken', {
        transaction,
      });

      await queryInterface.removeColumn('users', 'emailVerified', {
        transaction,
      });

      await queryInterface.removeColumn('users', 'password', { transaction });

      await queryInterface.removeColumn('users', 'disabled', { transaction });

      await queryInterface.removeColumn('users', 'role', { transaction });

      await queryInterface.removeColumn('users', 'email', { transaction });

      await queryInterface.removeColumn('users', 'phoneNumber', {
        transaction,
      });

      await queryInterface.removeColumn('users', 'lastName', { transaction });

      await queryInterface.removeColumn('users', 'firstName', { transaction });

      await queryInterface.dropTable('address_state', { transaction });

      await queryInterface.dropTable('journey', { transaction });

      await queryInterface.dropTable('goal_number_direction', { transaction });

      await queryInterface.dropTable('goals', { transaction });

      await queryInterface.dropTable('opco_contact', { transaction });

      await queryInterface.dropTable('opco_address', { transaction });

      await queryInterface.dropTable('initiative', { transaction });

      await queryInterface.dropTable('goal_type', { transaction });

      await queryInterface.dropTable('opco', { transaction });

      await queryInterface.dropTable('customer', { transaction });

      await queryInterface.dropTable('top_category', { transaction });

      await queryInterface.dropTable('category', { transaction });

      await queryInterface.dropTable('users', { transaction });

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
