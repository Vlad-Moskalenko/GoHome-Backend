const { Apartment } = require('../models');
const { ctrlWrapper, httpError } = require('../helpers');

const getApartments = async (req, res) => {
  const apartments = await Apartment.find();

  res.status(200).json({
    apartments,
  });
};

const getApartmentById = async (req, res) => {
  const { id } = req.params;

  const apartment = await Apartment.findById(id);

  if (!apartment) {
    throw httpError(404);
  }

  res.status(200).json(apartment);
};

const addReview = async (req, res) => {
  if (req.body?.review === undefined) {
    throw httpError(400, 'missing field review');
  }

  const apartment = await Apartment.findByIdAndUpdate(req.params.id, req.body, { new: true });

  if (!apartment) {
    throw httpError(404);
  }

  res.status(200).json(apartment);
};

module.exports = {
  getApartments: ctrlWrapper(getApartments),
  getApartmentById: ctrlWrapper(getApartmentById),
  addReview: ctrlWrapper(addReview),
};
