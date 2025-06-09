//TODO: implement order service(model first)
const OrderService = require('../services/order.service');
const { validationResult } = require('express-validator');

module.exports = {
  getOrders,
  getOrder,
  createOrder,
  updateOrderStatus,
};
