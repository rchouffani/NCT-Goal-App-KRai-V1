const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Opco_contactDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const opco_contact = await db.opco_contact.create(
      {
        id: data.id || undefined,

        First_Name: data.First_Name || null,
        Last_Name: data.Last_Name || null,
        Title: data.Title || null,
        Email: data.Email || null,
        Status: data.Status || false,

        Full_Name: data.Full_Name || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await opco_contact.setOpCo(data.OpCo || null, {
      transaction,
    });

    await opco_contact.setUser(data.user || null, {
      transaction,
    });

    return opco_contact;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const opco_contactData = data.map((item) => ({
      id: item.id || undefined,

      First_Name: item.First_Name || null,
      Last_Name: item.Last_Name || null,
      Title: item.Title || null,
      Email: item.Email || null,
      Status: item.Status || false,

      Full_Name: item.Full_Name || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
    }));

    // Bulk create items
    const opco_contact = await db.opco_contact.bulkCreate(opco_contactData, {
      transaction,
    });

    // For each item created, replace relation files

    return opco_contact;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const opco_contact = await db.opco_contact.findByPk(id, {
      transaction,
    });

    await opco_contact.update(
      {
        First_Name: data.First_Name || null,
        Last_Name: data.Last_Name || null,
        Title: data.Title || null,
        Email: data.Email || null,
        Status: data.Status || false,

        Full_Name: data.Full_Name || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await opco_contact.setOpCo(data.OpCo || null, {
      transaction,
    });

    await opco_contact.setUser(data.user || null, {
      transaction,
    });

    return opco_contact;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const opco_contact = await db.opco_contact.findByPk(id, options);

    await opco_contact.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await opco_contact.destroy({
      transaction,
    });

    return opco_contact;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const opco_contact = await db.opco_contact.findOne(
      { where },
      { transaction },
    );

    if (!opco_contact) {
      return opco_contact;
    }

    const output = opco_contact.get({ plain: true });

    output.OpCo = await opco_contact.getOpCo({
      transaction,
    });

    output.user = await opco_contact.getUser({
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
        model: db.users,
        as: 'user',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.First_Name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'opco_contact',
            'First_Name',
            filter.First_Name,
          ),
        };
      }

      if (filter.Last_Name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('opco_contact', 'Last_Name', filter.Last_Name),
        };
      }

      if (filter.Title) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('opco_contact', 'Title', filter.Title),
        };
      }

      if (filter.Email) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('opco_contact', 'Email', filter.Email),
        };
      }

      if (filter.Full_Name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('opco_contact', 'Full_Name', filter.Full_Name),
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

      if (filter.Status) {
        where = {
          ...where,
          Status: filter.Status,
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

      if (filter.user) {
        var listItems = filter.user.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          userId: { [Op.or]: listItems },
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
          count: await db.opco_contact.count({
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
      : await db.opco_contact.findAndCountAll({
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
          Utils.ilike('opco_contact', 'Full_Name', query),
        ],
      };
    }

    const records = await db.opco_contact.findAll({
      attributes: ['id', 'Full_Name'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['Full_Name', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.Full_Name,
    }));
  }
};
