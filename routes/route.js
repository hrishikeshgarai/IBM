var express = require('express');
var router = express.Router();

var app_controller = require('../controllers/controller');

// router.get('/fetch', app_controller.app_fetch);

router.get('/fetchAll', app_controller.app_fetch);
router.post('/resultData', app_controller.app_result);

module.exports = router;