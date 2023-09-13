const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Goal_typeDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const goal_type = await db.goal_type.create(
      {
        id: data.id || undefined,

        Goal_Type: data.Goal_Type || null,
        Goal_Type_Details: data.Goal_Type_Details || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return goal_type;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const goal_typeData = data.map((item) => ({
      id: item.id || undefined,

      Goal_Type: item.Goal_Type || null,
      Goal_Type_Details: item.Goal_Type_Details || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
    }));

    // Bulk create items
    const goal_type = await db.goal_type.bulkCreate(goal_typeData, {
      transaction,
    });

    // For each item created, replace relation files

    return goal_type;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const goal_type = await db.goal_type.findByPk(id, {
      transaction,
    });

    await goal_type.update(
      {
        Goal_Type: data.Goal_Type || null,
        Goal_Type_Details: data.Goal_Type_Details || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return goal_type;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const goal_type = await db.goal_type.findByPk(id, options);

    await goal_type.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await goal_type.destroy({
      transaction,
    });

    return goal_type;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const goal_type = await db.goal_type.findOne({ where }, { transaction });

    if (!goal_type) {
      return goal_type;
    }

    const output = goal_type.get({ plain: true });

    output.goals_Goal_Type = await goal_type.getGoals_Goal_Type({
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

      if (filter.Goal_Type) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('goal_type', 'Goal_Type', filter.Goal_Type),
        };
      }

      if (filter.Goal_Type_Details) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'goal_type',
            'Goal_Type_Details',
            filter.Goal_Type_Details,
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
          count: await db.goal_type.count({
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
      : await db.goal_type.findAndCountAll({
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
          Utils.ilike('goal_type', 'Goal_Type', query),
        ],
      };
    }

    const records = await db.goal_type.findAll({
      attributes: ['id', 'Goal_Type'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['Goal_Type', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.Goal_Type,
    }));
  }
};
