const db = require('../db/models');
const Opco_contactDBApi = require('../db/api/opco_contact');
const processFile = require('../middlewares/upload');
const csv = require('csv-parser');
const stream = require('stream');

module.exports = class Opco_contactService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await Opco_contactDBApi.create(data, {
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

      await Opco_contactDBApi.bulkImport(results, {
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
      let opco_contact = await Opco_contactDBApi.findBy(
        { id },
        { transaction },
      );

      if (!opco_contact) {
        throw new ValidationError('opco_contactNotFound');
      }

      await Opco_contactDBApi.update(id, data, {
        currentUser,
        transaction,
      });

      await transaction.commit();
      return opco_contact;
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

      await Opco_contactDBApi.remove(id, {
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
