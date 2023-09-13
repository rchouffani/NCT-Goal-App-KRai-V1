const express = require('express');

const CustomerService = require('../services/customer');
const CustomerDBApi = require('../db/api/customer');
const wrapAsync = require('../helpers').wrapAsync;

const router = express.Router();

const { parse } = require('json2csv');
/**
 *  @swagger
 *  components:
 *    schemas:
 *      Customer:
 *        type: object
 *        properties:

 *          Customer_Name:
 *            type: string
 *            default: Customer_Name
 *          Customer_id_Other:
 *            type: string
 *            default: Customer_id_Other

 *          Customer_id_CW:
 *            type: integer
 *            format: int64

 */

/**
 *  @swagger
 * tags:
 *   name: Customer
 *   description: The Customer managing API
 */

/**
 *  @swagger
 *  /api/customer:
 *    post:
 *      security:
 *        - bearerAuth: []
 *      tags: [Customer]
 *      summary: Add new item
 *      description: Add new item
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                data:
 *                  description: Data of the updated item
 *                  type: object
 *                  $ref: "#/components/schemas/Customer"
 *      responses:
 *        200:
 *          description: The item was successfully added
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Customer"
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        405:
 *          description: Invalid input data
 *        500:
 *          description: Some server error
 */

router.post(
  '/',
  wrapAsync(async (req, res) => {
    await CustomerService.create(
      req.body.data,
      req.currentUser,
      true,
      req.headers.referer,
    );
    const payload = true;
    res.status(200).send(payload);
  }),
);

router.post(
  '/bulk-import',
  wrapAsync(async (req, res) => {
    await CustomerService.bulkImport(req, res, true, req.headers.referer);
    const payload = true;
    res.status(200).send(payload);
  }),
);

/**
 *  @swagger
 *  /api/customer/{id}:
 *    put:
 *      security:
 *        - bearerAuth: []
 *      tags: [Customer]
 *      summary: Update the data of the selected item
 *      description: Update the data of the selected item
 *      parameters:
 *        - in: path
 *          name: id
 *          description: Item ID to update
 *          required: true
 *          schema:
 *            type: string
 *      requestBody:
 *        description: Set new item data
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                id:
 *                  description: ID of the updated item
 *                  type: string
 *                data:
 *                  description: Data of the updated item
 *                  type: object
 *                  $ref: "#/components/schemas/Customer"
 *              required:
 *                - id
 *      responses:
 *        200:
 *          description: The item data was successfully updated
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Customer"
 *        400:
 *          description: Invalid ID supplied
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        404:
 *          description: Item not found
 *        500:
 *          description: Some server error
 */

router.put(
  '/:id',
  wrapAsync(async (req, res) => {
    await CustomerService.update(req.body.data, req.body.id, req.currentUser);
    const payload = true;
    res.status(200).send(payload);
  }),
);

/**
 * @swagger
 *  /api/customer/{id}:
 *    delete:
 *      security:
 *        - bearerAuth: []
 *      tags: [Customer]
 *      summary: Delete the selected item
 *      description: Delete the selected item
 *      parameters:
 *        - in: path
 *          name: id
 *          description: Item ID to delete
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: The item was successfully deleted
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Customer"
 *        400:
 *          description: Invalid ID supplied
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        404:
 *          description: Item not found
 *        500:
 *          description: Some server error
 */

router.delete(
  '/:id',
  wrapAsync(async (req, res) => {
    await CustomerService.remove(req.params.id, req.currentUser);
    const payload = true;
    res.status(200).send(payload);
  }),
);

/**
 *  @swagger
 *  /api/customer:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags: [Customer]
 *      summary: Get all customer
 *      description: Get all customer
 *      responses:
 *        200:
 *          description: Customer list successfully received
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/Customer"
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        404:
 *          description: Data not found
 *        500:
 *          description: Some server error
 */

router.get(
  '/',
  wrapAsync(async (req, res) => {
    const filetype = req.query.filetype;
    const payload = await CustomerDBApi.findAll(req.query);
    if (filetype && filetype === 'csv') {
      const fields = [
        'id',
        'Customer_Name',
        'Customer_id_Other',
        'Customer_id_CW',
      ];
      const opts = { fields };
      try {
        const csv = parse(payload.rows, opts);
        res.status(200).attachment(csv);
        res.send(csv);
      } catch (err) {
        console.error(err);
      }
    } else {
      res.status(200).send(payload);
    }
  }),
);

/**
 *  @swagger
 *  /api/customer/count:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags: [Customer]
 *      summary: Count all customer
 *      description: Count all customer
 *      responses:
 *        200:
 *          description: Customer count successfully received
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/Customer"
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        404:
 *          description: Data not found
 *        500:
 *          description: Some server error
 */
router.get(
  '/count',
  wrapAsync(async (req, res) => {
    const payload = await CustomerDBApi.findAll(req.query, { countOnly: true });

    res.status(200).send(payload);
  }),
);

/**
 *  @swagger
 *  /api/customer/autocomplete:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags: [Customer]
 *      summary: Find all customer that match search criteria
 *      description: Find all customer that match search criteria
 *      responses:
 *        200:
 *          description: Customer list successfully received
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/Customer"
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        404:
 *          description: Data not found
 *        500:
 *          description: Some server error
 */
router.get('/autocomplete', async (req, res) => {
  const payload = await CustomerDBApi.findAllAutocomplete(
    req.query.query,
    req.query.limit,
  );

  res.status(200).send(payload);
});

/**
 * @swagger
 *  /api/customer/{id}:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags: [Customer]
 *      summary: Get selected item
 *      description: Get selected item
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID of item to get
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Selected item successfully received
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Customer"
 *        400:
 *          description: Invalid ID supplied
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        404:
 *          description: Item not found
 *        500:
 *          description: Some server error
 */

router.get(
  '/:id',
  wrapAsync(async (req, res) => {
    const payload = await CustomerDBApi.findBy({ id: req.params.id });

    res.status(200).send(payload);
  }),
);

router.use('/', require('../helpers').commonErrorHandler);

module.exports = router;
