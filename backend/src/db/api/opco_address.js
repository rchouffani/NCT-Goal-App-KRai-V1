const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Opco_addressDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const opco_address = await db.opco_address.create(
      {
        id: data.id || undefined,

        Street: data.Street || null,
        City: data.City || null,
        ZipCode: data.ZipCode || null,
        Country: data.Country || null,
        Head_Quarter: data.Head_Quarter || false,

        Long: data.Long || null,
        latit: data.latit || null,
        Address_Name: data.Address_Name || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await opco_address.setOpCo(data.OpCo || null, {
      transaction,
    });

    await opco_address.setAddress_state(data.address_state || null, {
      transaction,
    });

    return opco_address;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const opco_addressData = data.map((item) => ({
      id: item.id || undefined,

      Street: item.Street || null,
      City: item.City || null,
      ZipCode: item.ZipCode || null,
      Country: item.Country || null,
      Head_Quarter: item.Head_Quarter || false,

      Long: item.Long || null,
      latit: item.latit || null,
      Address_Name: item.Address_Name || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
    }));

    // Bulk create items
    const opco_address = await db.opco_address.bulkCreate(opco_addressData, {
      transaction,
    });

    // For each item created, replace relation files

    return opco_address;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const opco_address = await db.opco_address.findByPk(id, {
      transaction,
    });

    await opco_address.update(
      {
        Street: data.Street || null,
        City: data.City || null,
        ZipCode: data.ZipCode || null,
        Country: data.Country || null,
        Head_Quarter: data.Head_Quarter || false,

        Long: data.Long || null,
        latit: data.latit || null,
        Address_Name: data.Address_Name || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await opco_address.setOpCo(data.OpCo || null, {
      transaction,
    });

    await opco_address.setAddress_state(data.address_state || null, {
      transaction,
    });

    return opco_address;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const opco_address = await db.opco_address.findByPk(id, options);

    await opco_address.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await opco_address.destroy({
      transaction,
    });

    return opco_address;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const opco_address = await db.opco_address.findOne(
      { where },
      { transaction },
    );

    if (!opco_address) {
      return opco_address;
    }

    const output = opco_address.get({ plain: true });

    output.OpCo = await opco_address.getOpCo({
      transaction,
    });

    output.address_state = await opco_address.getAddress_state({
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
        model: db.address_state,
        as: 'address_state',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.Street) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('opco_address', 'Street', filter.Street),
        };
      }

      if (filter.City) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('opco_address', 'City', filter.City),
        };
      }

      if (filter.ZipCode) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('opco_address', 'ZipCode', filter.ZipCode),
        };
      }

      if (filter.Country) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('opco_address', 'Country', filter.Country),
        };
      }

      if (filter.Long) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('opco_address', 'Long', filter.Long),
        };
      }

      if (filter.latit) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('opco_address', 'latit', filter.latit),
        };
      }

      if (filter.Address_Name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'opco_address',
            'Address_Name',
            filter.Address_Name,
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

      if (filter.Head_Quarter) {
        where = {
          ...where,
          Head_Quarter: filter.Head_Quarter,
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

      if (filter.address_state) {
        var listItems = filter.address_state.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          address_stateId: { [Op.or]: listItems },
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
          count: await db.opco_address.count({
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
      : await db.opco_address.findAndCountAll({
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
          Utils.ilike('opco_address', 'Address_Name', query),
        ],
      };
    }

    const records = await db.opco_address.findAll({
      attributes: ['id', 'Address_Name'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['Address_Name', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.Address_Name,
    }));
  }
};
