const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Address_stateDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const address_state = await db.address_state.create(
      {
        id: data.id || undefined,

        State: data.State || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return address_state;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const address_stateData = data.map((item) => ({
      id: item.id || undefined,

      State: item.State || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
    }));

    // Bulk create items
    const address_state = await db.address_state.bulkCreate(address_stateData, {
      transaction,
    });

    // For each item created, replace relation files

    return address_state;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const address_state = await db.address_state.findByPk(id, {
      transaction,
    });

    await address_state.update(
      {
        State: data.State || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return address_state;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const address_state = await db.address_state.findByPk(id, options);

    await address_state.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await address_state.destroy({
      transaction,
    });

    return address_state;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const address_state = await db.address_state.findOne(
      { where },
      { transaction },
    );

    if (!address_state) {
      return address_state;
    }

    const output = address_state.get({ plain: true });

    output.opco_address_address_state =
      await address_state.getOpco_address_address_state({
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

      if (filter.State) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('address_state', 'State', filter.State),
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
          count: await db.address_state.count({
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
      : await db.address_state.findAndCountAll({
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
          Utils.ilike('address_state', 'State', query),
        ],
      };
    }

    const records = await db.address_state.findAll({
      attributes: ['id', 'State'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['State', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.State,
    }));
  }
};
