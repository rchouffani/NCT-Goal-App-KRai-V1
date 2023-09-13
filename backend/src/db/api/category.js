const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class CategoryDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const category = await db.category.create(
      {
        id: data.id || undefined,

        Category: data.Category || null,
        Disabled_Status: data.Disabled_Status || false,

        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await category.setTop_category(data.top_category || null, {
      transaction,
    });

    return category;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const categoryData = data.map((item) => ({
      id: item.id || undefined,

      Category: item.Category || null,
      Disabled_Status: item.Disabled_Status || false,

      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
    }));

    // Bulk create items
    const category = await db.category.bulkCreate(categoryData, {
      transaction,
    });

    // For each item created, replace relation files

    return category;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const category = await db.category.findByPk(id, {
      transaction,
    });

    await category.update(
      {
        Category: data.Category || null,
        Disabled_Status: data.Disabled_Status || false,

        updatedById: currentUser.id,
      },
      { transaction },
    );

    await category.setTop_category(data.top_category || null, {
      transaction,
    });

    return category;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const category = await db.category.findByPk(id, options);

    await category.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await category.destroy({
      transaction,
    });

    return category;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const category = await db.category.findOne({ where }, { transaction });

    if (!category) {
      return category;
    }

    const output = category.get({ plain: true });

    output.goals_Category = await category.getGoals_Category({
      transaction,
    });

    output.top_category = await category.getTop_category({
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
        model: db.top_category,
        as: 'top_category',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.Category) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('category', 'Category', filter.Category),
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

      if (filter.Disabled_Status) {
        where = {
          ...where,
          Disabled_Status: filter.Disabled_Status,
        };
      }

      if (filter.top_category) {
        var listItems = filter.top_category.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          top_categoryId: { [Op.or]: listItems },
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
          count: await db.category.count({
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
      : await db.category.findAndCountAll({
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
          Utils.ilike('category', 'Category', query),
        ],
      };
    }

    const records = await db.category.findAll({
      attributes: ['id', 'Category'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['Category', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.Category,
    }));
  }
};
