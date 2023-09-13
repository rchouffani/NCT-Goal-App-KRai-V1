const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Top_categoryDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const top_category = await db.top_category.create(
      {
        id: data.id || undefined,

        Top_Category: data.Top_Category || null,
        Top_Category_Details: data.Top_Category_Details || null,
        Disable_Status: data.Disable_Status || false,

        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await top_category.setInitiative(data.Initiative || null, {
      transaction,
    });

    return top_category;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const top_categoryData = data.map((item) => ({
      id: item.id || undefined,

      Top_Category: item.Top_Category || null,
      Top_Category_Details: item.Top_Category_Details || null,
      Disable_Status: item.Disable_Status || false,

      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
    }));

    // Bulk create items
    const top_category = await db.top_category.bulkCreate(top_categoryData, {
      transaction,
    });

    // For each item created, replace relation files

    return top_category;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const top_category = await db.top_category.findByPk(id, {
      transaction,
    });

    await top_category.update(
      {
        Top_Category: data.Top_Category || null,
        Top_Category_Details: data.Top_Category_Details || null,
        Disable_Status: data.Disable_Status || false,

        updatedById: currentUser.id,
      },
      { transaction },
    );

    await top_category.setInitiative(data.Initiative || null, {
      transaction,
    });

    return top_category;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const top_category = await db.top_category.findByPk(id, options);

    await top_category.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await top_category.destroy({
      transaction,
    });

    return top_category;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const top_category = await db.top_category.findOne(
      { where },
      { transaction },
    );

    if (!top_category) {
      return top_category;
    }

    const output = top_category.get({ plain: true });

    output.category_top_category = await top_category.getCategory_top_category({
      transaction,
    });

    output.Initiative = await top_category.getInitiative({
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
        model: db.initiative,
        as: 'Initiative',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.Top_Category) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'top_category',
            'Top_Category',
            filter.Top_Category,
          ),
        };
      }

      if (filter.Top_Category_Details) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'top_category',
            'Top_Category_Details',
            filter.Top_Category_Details,
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

      if (filter.Disable_Status) {
        where = {
          ...where,
          Disable_Status: filter.Disable_Status,
        };
      }

      if (filter.Initiative) {
        var listItems = filter.Initiative.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          InitiativeId: { [Op.or]: listItems },
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
          count: await db.top_category.count({
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
      : await db.top_category.findAndCountAll({
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
          Utils.ilike('top_category', 'Top_Category', query),
        ],
      };
    }

    const records = await db.top_category.findAll({
      attributes: ['id', 'Top_Category'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['Top_Category', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.Top_Category,
    }));
  }
};
