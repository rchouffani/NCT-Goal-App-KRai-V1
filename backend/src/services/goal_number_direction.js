const db = require('../db/models');
const Goal_number_directionDBApi = require('../db/api/goal_number_direction');
const processFile = require('../middlewares/upload');
const csv = require('csv-parser');
const stream = require('stream');

module.exports = class Goal_number_directionService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await Goal_number_directionDBApi.create(data, {
        currentUser,
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  static async bulkImport(req, res, sendInvitationEmails = true, host) {
    const transaction = await db.sequelize.transaction();

    try {
      await processFile(req, res);
      const bufferStream = new stream.PassThrough();
      const results = [];

      await bufferStream.end(Buffer.from(req.file.buffer, 'utf-8')); // convert Buffer to Stream

      await new Promise((resolve, reject) => {
        bufferStream
          .pipe(csv())
          .on('data', (data) => results.push(data))
          .on('end', async () => {
            console.log('CSV results', results);
            resolve();
          })
          .on('error', (error) => reject(error));
      });

      await Goal_number_directionDBApi.bulkImport(results, {
        transaction,
        ignoreDuplicates: true,
        validate: true,
        currentUser: req.currentUser,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  static async update(data, id, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      let goal_number_direction = await Goal_number_directionDBApi.findBy(
        { id },
        { transaction },
      );

      if (!goal_number_direction) {
        throw new ValidationError('goal_number_directionNotFound');
      }

      await Goal_number_directionDBApi.update(id, data, {
        currentUser,
        transaction,
      });

      await transaction.commit();
      return goal_number_direction;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  static async remove(id, currentUser) {
    const transaction = await db.sequelize.transaction();

    try {
      if (currentUser.role !== 'admin') {
        throw new ValidationError('errors.forbidden.message');
      }

      await Goal_number_directionDBApi.remove(id, {
        currentUser,
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};
