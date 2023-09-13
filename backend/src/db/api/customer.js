const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class CustomerDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const customer = await db.customer.create(
      {
        id: data.id || undefined,

        Customer_Name: data.Customer_Name || null,
        Customer_id_CW: data.Customer_id_CW || null,
        Customer_id_Other: data.Customer_id_Other || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await customer.setOpCo(data.OpCo || null, {
      transaction,
    });

    return customer;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const customerData = data.map((item) => ({
      id: item.id || undefined,

      Customer_Name: item.Customer_Name || null,
      Customer_id_CW: item.Customer_id_CW || null,
      Customer_id_Other: item.Customer_id_Other || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
    }));

    // Bulk create items
    const customer = await db.customer.bulkCreate(customerData, {
      transaction,
    });

    // For each item created, replace relation files

    return customer;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const customer = await db.customer.findByPk(id, {
      transaction,
    });

    await customer.update(
      {
        Customer_Name: data.Customer_Name || null,
        Customer_id_CW: data.Customer_id_CW || null,
        Customer_id_Other: data.Customer_id_Other || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await customer.setOpCo(data.OpCo || null, {
      transaction,
    });

    return customer;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const customer = await db.customer.findByPk(id, options);

    await customer.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await customer.destroy({
      transaction,
    });

    return customer;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const customer = await db.customer.findOne({ where }, { transaction });

    if (!customer) {
      return customer;
    }

    const output = customer.get({ plain: true });

    output.OpCo = await customer.getOpCo({
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

      if (filter.Customer_Name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'customer',
            'Customer_Name',
            filter.Customer_Name,
          ),
        };
      }

      if (filter.Customer_id_Other) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'customer',
            'Customer_id_Other',
            filter.Customer_id_Other,
          ),
        };
      }

      if (filter.Customer_id_CWRange) {
        const [start, end] = filter.Customer_id_CWRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            Customer_id_CW: {
              ...where.Customer_id_CW,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            Customer_id_CW: {
              ...where.Customer_id_CW,
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
          count: await db.customer.count({
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
      : await db.customer.findAndCountAll({
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
          Utils.ilike('customer', 'Customer_Name', query),
        ],
      };
    }

    const records = await db.customer.findAll({
      attributes: ['id', 'Customer_Name'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['Customer_Name', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.Customer_Name,
    }));
  }
};
