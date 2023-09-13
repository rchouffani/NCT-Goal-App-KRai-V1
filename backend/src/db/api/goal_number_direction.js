const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Goal_number_directionDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const goal_number_direction = await db.goal_number_direction.create(
      {
        id: data.id || undefined,

        Goal_Number_Direction: data.Goal_Number_Direction || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return goal_number_direction;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const goal_number_directionData = data.map((item) => ({
      id: item.id || undefined,

      Goal_Number_Direction: item.Goal_Number_Direction || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
    }));

    // Bulk create items
    const goal_number_direction = await db.goal_number_direction.bulkCreate(
      goal_number_directionData,
      { transaction },
    );

    // For each item created, replace relation files

    return goal_number_direction;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const goal_number_direction = await db.goal_number_direction.findByPk(id, {
      transaction,
    });

    await goal_number_direction.update(
      {
        Goal_Number_Direction: data.Goal_Number_Direction || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return goal_number_direction;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const goal_number_direction = await db.goal_number_direction.findByPk(
      id,
      options,
    );

    await goal_number_direction.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await goal_number_direction.destroy({
      transaction,
    });

    return goal_number_direction;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const goal_number_direction = await db.goal_number_direction.findOne(
      { where },
      { transaction },
    );

    if (!goal_number_direction) {
      return goal_number_direction;
    }

    const output = goal_number_direction.get({ plain: true });

    output.goals_Goal_Number_Direction =
      await goal_number_direction.getGoals_Goal_Number_Direction({
        transaction,
      });

    return output;
  }

  static async findAll(filter, options) {
    var limit = filter.limit || 0;
    var offset = 0;
    const currentPage = +filter.page;

    offset = currentPage * limit;

    var orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.Goal_Number_Direction) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'goal_number_direction',
            'Goal_Number_Direction',
            filter.Goal_Number_Direction,
          ),
        };
      }

      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    let { rows, count } = options?.countOnly
      ? {
          rows: [],
          count: await db.goal_number_direction.count({
            where,
            include,
            distinct: true,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            order:
              filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction,
          }),
        }
      : await db.goal_number_direction.findAndCountAll({
          where,
          include,
          distinct: true,
          limit: limit ? Number(limit) : undefined,
          offset: offset ? Number(offset) : undefined,
          order:
            filter.field && filter.sort
              ? [[filter.field, filter.sort]]
              : [['createdAt', 'desc']],
          transaction,
        });

    //    rows = await this._fillWithRelationsAndFilesForRows(
    //      rows,
    //      options,
    //    );

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit) {
    let where = {};

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('goal_number_direction', 'Goal_Number_Direction', query),
        ],
      };
    }

    const records = await db.goal_number_direction.findAll({
      attributes: ['id', 'Goal_Number_Direction'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['Goal_Number_Direction', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.Goal_Number_Direction,
    }));
  }
};
