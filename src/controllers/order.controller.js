//TODO: implement order service(model first)
const OrderService = require('../services/order.service');
const { validationResult } = require('express-validator');

const getOrders = async (req, res) => {
  try {
    const orders = await OrderService.getOrders(req.user._id);

    res.json({
      status: 'success',
      data: { orders },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

const getOrder = async (req, res) => {
  try {
    const order = await OrderService.getOrder(req.user._id, req.params.id);
    res.json({
      status: 'success',
      data: {order}
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
}

const createOrder = async (req, res) => {
  try {
    const order = await OrderService.createOrder(req.user._id);
    res.status(201).json({
      status:  'success',
      data: {order}
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

const updateOrderStatus = async(req, res) => {
  try {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors: errors.array()});
    }

    const {status} = req.body;
    const order = await OrderService.updateOrderStatus(req.params.id, status);
    
    res.json({
      status:'success',
      data: {order}
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

module.exports = {
  getOrders,
  getOrder,
  createOrder,
  updateOrderStatus,
};
