const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class InitiativeDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const initiative = await db.initiative.create(
      {
        id: data.id || undefined,

        Initiative: data.Initiative || null,
        Initiative_Details: data.Initiative_Details || null,
        Start_Date: data.Start_Date || null,
        End_Date: data.End_Date || null,
        Disabled_Status: data.Disabled_Status || false,

        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return initiative;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const initiativeData = data.map((item) => ({
      id: item.id || undefined,

      Initiative: item.Initiative || null,
      Initiative_Details: item.Initiative_Details || null,
      Start_Date: item.Start_Date || null,
      End_Date: item.End_Date || null,
      Disabled_Status: item.Disabled_Status || false,

      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
    }));

    // Bulk create items
    const initiative = await db.initiative.bulkCreate(initiativeData, {
      transaction,
    });

    // For each item created, replace relation files

    return initiative;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const initiative = await db.initiative.findByPk(id, {
      transaction,
    });

    await initiative.update(
      {
        Initiative: data.Initiative || null,
        Initiative_Details: data.Initiative_Details || null,
        Start_Date: data.Start_Date || null,
        End_Date: data.End_Date || null,
        Disabled_Status: data.Disabled_Status || false,

        updatedById: currentUser.id,
      },
      { transaction },
    );

    return initiative;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const initiative = await db.initiative.findByPk(id, options);

    await initiative.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await initiative.destroy({
      transaction,
    });

    return initiative;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const initiative = await db.initiative.findOne({ where }, { transaction });

    if (!initiative) {
      return initiative;
    }

    const output = initiative.get({ plain: true });

    output.top_category_Initiative =
      await initiative.getTop_category_Initiative({
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

      if (filter.Initiative) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('initiative', 'Initiative', filter.Initiative),
        };
      }

      if (filter.Initiative_Details) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'initiative',
            'Initiative_Details',
            filter.Initiative_Details,
          ),
        };
      }

      if (filter.Start_DateRange) {
        const [start, end] = filter.Start_DateRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            Start_Date: {
              ...where.Start_Date,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            Start_Date: {
              ...where.Start_Date,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.End_DateRange) {
        const [start, end] = filter.End_DateRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            End_Date: {
              ...where.End_Date,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            End_Date: {
              ...where.End_Date,
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

      if (filter.Disabled_Status) {
        where = {
          ...where,
          Disabled_Status: filter.Disabled_Status,
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
          count: await db.initiative.count({
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
      : await db.initiative.findAndCountAll({
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
          Utils.ilike('initiative', 'Initiative', query),
        ],
      };
    }

    const records = await db.initiative.findAll({
      attributes: ['id', 'Initiative'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['Initiative', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.Initiative,
    }));
  }
};
