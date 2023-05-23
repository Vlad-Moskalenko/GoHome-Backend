const { Apartment } = require('../models');
const { ctrlWrapper, httpError } = require('../helpers');

const getCities = async (req, res) => {
  const location = await Apartment.find({}, 'location');

  if (!location) {
    httpError(404);
  }

  res.status(200).json(location);
};

module.exports = {
  getCities: ctrlWrapper(getCities),
};
