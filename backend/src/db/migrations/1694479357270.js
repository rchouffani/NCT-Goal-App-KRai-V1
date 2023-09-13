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
      await queryInterface.addColumn(
        'top_category',
        'Disable_Status',
        {
          type: Sequelize.DataTypes.BOOLEAN,

          defaultValue: false,
          allowNull: false,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'category',
        'Disabled_Status',
        {
          type: Sequelize.DataTypes.BOOLEAN,

          defaultValue: false,
          allowNull: false,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'journey',
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
        'journey',
        'Journey_Date',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'journey',
        'Journey_Status',
        {
          type: Sequelize.DataTypes.ENUM,

          values: ['Completed', 'Canceled', 'Pending'],
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
      await queryInterface.removeColumn('journey', 'Journey_Status', {
        transaction,
      });

      await queryInterface.removeColumn('journey', 'Journey_Date', {
        transaction,
      });

      await queryInterface.removeColumn('journey', 'OpCoId', { transaction });

      await queryInterface.removeColumn('category', 'Disabled_Status', {
        transaction,
      });

      await queryInterface.removeColumn('top_category', 'Disable_Status', {
        transaction,
      });

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
