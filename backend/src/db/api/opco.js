const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class OpcoDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const opco = await db.opco.create(
      {
        id: data.id || undefined,

        OpCo_Name: data.OpCo_Name || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await FileDBApi.replaceRelationFiles(
      {
        belongsTo: db.opco.getTableName(),
        belongsToColumn: 'Logo',
        belongsToId: opco.id,
      },
      data.Logo,
      options,
    );

    return opco;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const opcoData = data.map((item) => ({
      id: item.id || undefined,

      OpCo_Name: item.OpCo_Name || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
    }));

    // Bulk create items
    const opco = await db.opco.bulkCreate(opcoData, { transaction });

    // For each item created, replace relation files

    for (let i = 0; i < opco.length; i++) {
      await FileDBApi.replaceRelationFiles(
        {
          belongsTo: db.opco.getTableName(),
          belongsToColumn: 'Logo',
          belongsToId: opco[i].id,
        },
        data[i].Logo,
        options,
      );
    }

    return opco;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const opco = await db.opco.findByPk(id, {
      transaction,
    });

    await opco.update(
      {
        OpCo_Name: data.OpCo_Name || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await FileDBApi.replaceRelationFiles(
      {
        belongsTo: db.opco.getTableName(),
        belongsToColumn: 'Logo',
        belongsToId: opco.id,
      },
      data.Logo,
      options,
    );

    return opco;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const opco = await db.opco.findByPk(id, options);

    await opco.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await opco.destroy({
      transaction,
    });

    return opco;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const opco = await db.opco.findOne({ where }, { transaction });

    if (!opco) {
      return opco;
    }

    const output = opco.get({ plain: true });

    output.customer_OpCo = await opco.getCustomer_OpCo({
      transaction,
    });

    output.opco_address_OpCo = await opco.getOpco_address_OpCo({
      transaction,
    });

    output.opco_contact_OpCo = await opco.getOpco_contact_OpCo({
      transaction,
    });

    output.goals_OpCo = await opco.getGoals_OpCo({
      transaction,
    });

    output.journey_OpCo = await opco.getJourney_OpCo({
      transaction,
    });

    output.Logo = await opco.getLogo({
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
        model: db.file,
        as: 'Logo',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.OpCo_Name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('opco', 'OpCo_Name', filter.OpCo_Name),
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
          count: await db.opco.count({
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
      : await db.opco.findAndCountAll({
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
          Utils.ilike('opco', 'OpCo_Name', query),
        ],
      };
    }

    const records = await db.opco.findAll({
      attributes: ['id', 'OpCo_Name'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['OpCo_Name', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.OpCo_Name,
    }));
  }
};
