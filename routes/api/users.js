const express = require('express');
const router = express.Router();

const ctrl = require('../../controllers/users');
const { auth } = require('../../middlewares');

router.post('/register', ctrl.register);

router.post('/login', ctrl.login);

router.post('/logout', auth, ctrl.logout);

router.get('/current', auth, ctrl.current);

module.exports = router;
