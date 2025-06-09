const express = require('express');
const { body } = require('express-validator');
const {protect, admin} = require('../middleware/auth.middleware');
//TODO: implement order controller
const {
    getOrders,
    getOrder,
    createOrder,
    updateOrderStatus
} = require('../controllers/order.controller');
const router = express.Router();

//all need a signed in user
router.use(protect);

//user routes
router.get('/', getOrders);
router.get('/:id', getOrder);
router.post('/', createOrder);

// Admin routes
router.put('/:id/status', admin, updateOrderStatus);

module.exports = router;