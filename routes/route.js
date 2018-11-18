var express = require('express');
var router = express.Router();

var app_controller = require('../controllers/controller');

// Route to fetch all data
router.get('/fetchAll', app_controller.app_fetch);

// Route to filter, sort and paginate data
router.post('/resultData', app_controller.app_result);

// Route to add new data
router.post('/newData', app_controller.app_newData);

module.exports = router;