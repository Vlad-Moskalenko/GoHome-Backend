const { ctrlWrapper, httpError } = require('../helpers');
const Order = require('../models/order');

const getOrders = async (res, req) => {
  const orders = await Order.find();

  res.status(200).json(orders);
};

const addOrder = async (req, res) => {
  const { _id: user } = req.user;

  const order = await Order.create({ ...req.body, user });

  res.status(201).json(order);
};

const deleteOrder = async (req, res) => {
  const { id } = req.params;

  await Order.findByIdAndRemove(id);

  if (!Order) {
    throw httpError(404);
  }

  res.status(204);
};

module.exports = {
  getOrders: ctrlWrapper(getOrders),
  addOrder: ctrlWrapper(addOrder),
  deleteOrder: ctrlWrapper(deleteOrder),
};
