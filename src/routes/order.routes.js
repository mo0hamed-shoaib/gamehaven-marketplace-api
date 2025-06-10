const express = require('express');
const { body } = require('express-validator');
const { protect, admin } = require('../middleware/auth.middleware');
const {
  getOrders,
  getOrder,
  createOrder,
  updateOrderStatus,
} = require('../controllers/order.controller');
const router = express.Router();

const orderStatusValidation = [
  body('status').isIn(['pending', 'completed', 'cancelled']).withMessage('invalid order status')
];

//all need a signed in user
router.use(protect);

//user routes
router.get('/', getOrders);
router.get('/:id', getOrder);
router.post('/', createOrder);

// Admin routes
router.put('/:id/status', admin, orderStatusValidation, updateOrderStatus);

module.exports = router;
