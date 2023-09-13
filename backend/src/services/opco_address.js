const db = require('../db/models');
const Opco_addressDBApi = require('../db/api/opco_address');
const processFile = require('../middlewares/upload');
const csv = require('csv-parser');
const stream = require('stream');

module.exports = class Opco_addressService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await Opco_addressDBApi.create(data, {
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

      await Opco_addressDBApi.bulkImport(results, {
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
      let opco_address = await Opco_addressDBApi.findBy(
        { id },
        { transaction },
      );

      if (!opco_address) {
        throw new ValidationError('opco_addressNotFound');
      }

      await Opco_addressDBApi.update(id, data, {
        currentUser,
        transaction,
      });

      await transaction.commit();
      return opco_address;
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

      await Opco_addressDBApi.remove(id, {
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
