const { Schema, model } = require('mongoose');

const { handleMongooseError } = require('../helpers');

const orderSchema = new Schema(
  {
    orders: {
      type: Array,
      default: [],
    },
  },
  { versionKey: false, timestamps: true }
);

orderSchema.post('save', handleMongooseError);

const Order = model('order', orderSchema);

module.exports = Order;
