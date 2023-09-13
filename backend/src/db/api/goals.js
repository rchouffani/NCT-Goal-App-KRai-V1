const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class GoalsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const goals = await db.goals.create(
      {
        id: data.id || undefined,

        Date: data.Date || null,
        Due_Date: data.Due_Date || null,
        Goal_Number: data.Goal_Number || null,
        Goal_UOM: data.Goal_UOM || null,
        Period: data.Period || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await goals.setOpCo(data.OpCo || null, {
      transaction,
    });

    await goals.setCategory(data.Category || null, {
      transaction,
    });

    await goals.setGoal_Type(data.Goal_Type || null, {
      transaction,
    });

    await goals.setGoal_Number_Direction(data.Goal_Number_Direction || null, {
      transaction,
    });

    return goals;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const goalsData = data.map((item) => ({
      id: item.id || undefined,

      Date: item.Date || null,
      Due_Date: item.Due_Date || null,
      Goal_Number: item.Goal_Number || null,
      Goal_UOM: item.Goal_UOM || null,
      Period: item.Period || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
    }));

    // Bulk create items
    const goals = await db.goals.bulkCreate(goalsData, { transaction });

    // For each item created, replace relation files

    return goals;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const goals = await db.goals.findByPk(id, {
      transaction,
    });

    await goals.update(
      {
        Date: data.Date || null,
        Due_Date: data.Due_Date || null,
        Goal_Number: data.Goal_Number || null,
        Goal_UOM: data.Goal_UOM || null,
        Period: data.Period || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await goals.setOpCo(data.OpCo || null, {
      transaction,
    });

    await goals.setCategory(data.Category || null, {
      transaction,
    });

    await goals.setGoal_Type(data.Goal_Type || null, {
      transaction,
    });

    await goals.setGoal_Number_Direction(data.Goal_Number_Direction || null, {
      transaction,
    });

    return goals;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const goals = await db.goals.findByPk(id, options);

    await goals.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await goals.destroy({
      transaction,
    });

    return goals;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const goals = await db.goals.findOne({ where }, { transaction });

    if (!goals) {
      return goals;
    }

    const output = goals.get({ plain: true });

    output.OpCo = await goals.getOpCo({
      transaction,
    });

    output.Category = await goals.getCategory({
      transaction,
    });

    output.Goal_Type = await goals.getGoal_Type({
      transaction,
    });

    output.Goal_Number_Direction = await goals.getGoal_Number_Direction({
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
    let include = [
      {
        model: db.opco,
        as: 'OpCo',
      },

      {
        model: db.category,
        as: 'Category',
      },

      {
        model: db.goal_type,
        as: 'Goal_Type',
      },

      {
        model: db.goal_number_direction,
        as: 'Goal_Number_Direction',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.Goal_UOM) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('goals', 'Goal_UOM', filter.Goal_UOM),
        };
      }

      if (filter.Period) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('goals', 'Period', filter.Period),
        };
      }

      if (filter.DateRange) {
        const [start, end] = filter.DateRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            Date: {
              ...where.Date,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            Date: {
              ...where.Date,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.Due_DateRange) {
        const [start, end] = filter.Due_DateRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            Due_Date: {
              ...where.Due_Date,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            Due_Date: {
              ...where.Due_Date,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.Goal_NumberRange) {
        const [start, end] = filter.Goal_NumberRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            Goal_Number: {
              ...where.Goal_Number,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            Goal_Number: {
              ...where.Goal_Number,
              [Op.lte]: end,
            },
          };
        }
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

      if (filter.OpCo) {
        var listItems = filter.OpCo.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          OpCoId: { [Op.or]: listItems },
        };
      }

      if (filter.Category) {
        var listItems = filter.Category.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          CategoryId: { [Op.or]: listItems },
        };
      }

      if (filter.Goal_Type) {
        var listItems = filter.Goal_Type.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          Goal_TypeId: { [Op.or]: listItems },
        };
      }

      if (filter.Goal_Number_Direction) {
        var listItems = filter.Goal_Number_Direction.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          Goal_Number_DirectionId: { [Op.or]: listItems },
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
          count: await db.goals.count({
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
      : await db.goals.findAndCountAll({
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
          Utils.ilike('goals', 'id', query),
        ],
      };
    }

    const records = await db.goals.findAll({
      attributes: ['id', 'id'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['id', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.id,
    }));
  }
};
