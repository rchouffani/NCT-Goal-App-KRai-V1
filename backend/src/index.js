const express = require('express');
const cors = require('cors');
const app = express();
const passport = require('passport');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const db = require('./db/models');
const config = require('./config');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const authRoutes = require('./routes/auth');
const fileRoutes = require('./routes/file');

const usersRoutes = require('./routes/users');

const categoryRoutes = require('./routes/category');

const top_categoryRoutes = require('./routes/top_category');

const customerRoutes = require('./routes/customer');

const opcoRoutes = require('./routes/opco');

const goal_typeRoutes = require('./routes/goal_type');

const initiativeRoutes = require('./routes/initiative');

const opco_addressRoutes = require('./routes/opco_address');

const opco_contactRoutes = require('./routes/opco_contact');

const goalsRoutes = require('./routes/goals');

const goal_number_directionRoutes = require('./routes/goal_number_direction');

const journeyRoutes = require('./routes/journey');

const address_stateRoutes = require('./routes/address_state');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'NCT Goal App KRai',
      description:
        'NCT Goal App KRai Online REST API for Testing and Prototyping application. You can perform all major operations with your entities - create, delete and etc.',
    },
    servers: [
      {
        url: config.swaggerUrl,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      responses: {
        UnauthorizedError: {
          description: 'Access token is missing or invalid',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJsDoc(options);
app.use(
  '/api-docs',
  function (req, res, next) {
    swaggerUI.host = req.get('host');
    next();
  },
  swaggerUI.serve,
  swaggerUI.setup(specs),
);

app.use(cors({ origin: true }));
require('./auth/auth');

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/file', fileRoutes);

app.use(
  '/api/users',
  passport.authenticate('jwt', { session: false }),
  usersRoutes,
);

app.use(
  '/api/category',
  passport.authenticate('jwt', { session: false }),
  categoryRoutes,
);

app.use(
  '/api/top_category',
  passport.authenticate('jwt', { session: false }),
  top_categoryRoutes,
);

app.use(
  '/api/customer',
  passport.authenticate('jwt', { session: false }),
  customerRoutes,
);

app.use(
  '/api/opco',
  passport.authenticate('jwt', { session: false }),
  opcoRoutes,
);

app.use(
  '/api/goal_type',
  passport.authenticate('jwt', { session: false }),
  goal_typeRoutes,
);

app.use(
  '/api/initiative',
  passport.authenticate('jwt', { session: false }),
  initiativeRoutes,
);

app.use(
  '/api/opco_address',
  passport.authenticate('jwt', { session: false }),
  opco_addressRoutes,
);

app.use(
  '/api/opco_contact',
  passport.authenticate('jwt', { session: false }),
  opco_contactRoutes,
);

app.use(
  '/api/goals',
  passport.authenticate('jwt', { session: false }),
  goalsRoutes,
);

app.use(
  '/api/goal_number_direction',
  passport.authenticate('jwt', { session: false }),
  goal_number_directionRoutes,
);

app.use(
  '/api/journey',
  passport.authenticate('jwt', { session: false }),
  journeyRoutes,
);

app.use(
  '/api/address_state',
  passport.authenticate('jwt', { session: false }),
  address_stateRoutes,
);

const publicDir = path.join(__dirname, '../public');

if (fs.existsSync(publicDir)) {
  app.use('/', express.static(publicDir));

  app.get('*', function (request, response) {
    response.sendFile(path.resolve(publicDir, 'index.html'));
  });
}

const PORT = process.env.PORT || 8080;

db.sequelize.sync().then(function () {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});

module.exports = app;
