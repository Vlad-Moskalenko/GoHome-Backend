const express = require('express');
const router = express.Router();

const ctrl = require('../../controllers/cities');

router.get('/', ctrl.getCities);

module.exports = router;
