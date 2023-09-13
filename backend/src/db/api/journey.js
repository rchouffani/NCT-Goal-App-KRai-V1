const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class JourneyDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const journey = await db.journey.create(
      {
        id: data.id || undefined,

        journey: data.journey || null,
        Journey_Date: data.Journey_Date || null,
        Journey_Status: data.Journey_Status || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await journey.setOpCo(data.OpCo || null, {
      transaction,
    });

    return journey;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const journeyData = data.map((item) => ({
      id: item.id || undefined,

      journey: item.journey || null,
      Journey_Date: item.Journey_Date || null,
      Journey_Status: item.Journey_Status || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
    }));

    // Bulk create items
    const journey = await db.journey.bulkCreate(journeyData, { transaction });

    // For each item created, replace relation files

    return journey;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const journey = await db.journey.findByPk(id, {
      transaction,
    });

    await journey.update(
      {
        journey: data.journey || null,
        Journey_Date: data.Journey_Date || null,
        Journey_Status: data.Journey_Status || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await journey.setOpCo(data.OpCo || null, {
      transaction,
    });

    return journey;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const journey = await db.journey.findByPk(id, options);

    await journey.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await journey.destroy({
      transaction,
    });

    return journey;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const journey = await db.journey.findOne({ where }, { transaction });

    if (!journey) {
      return journey;
    }

    const output = journey.get({ plain: true });

    output.OpCo = await journey.getOpCo({
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
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.journey) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('journey', 'journey', filter.journey),
        };
      }

      if (filter.Journey_DateRange) {
        const [start, end] = filter.Journey_DateRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            Journey_Date: {
              ...where.Journey_Date,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            Journey_Date: {
              ...where.Journey_Date,
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

      if (filter.Journey_Status) {
        where = {
          ...where,
          Journey_Status: filter.Journey_Status,
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
          count: await db.journey.count({
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
      : await db.journey.findAndCountAll({
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
          Utils.ilike('journey', 'journey', query),
        ],
      };
    }

    const records = await db.journey.findAll({
      attributes: ['id', 'journey'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['journey', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.journey,
    }));
  }
};
