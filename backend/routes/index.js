var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CodeFest-Taipei-Backend' });
});

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../docs/swagger_output.json')

router.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))


module.exports = router;
