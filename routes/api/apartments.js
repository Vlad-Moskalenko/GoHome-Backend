const express = require('express');
const router = express.Router();

const ctrl = require('../../controllers/apartments');

router.get('/', ctrl.getApartments);

router.get('/:id', ctrl.getApartmentById);

router.patch('/:id/reviews', ctrl.addReview);

module.exports = router;
