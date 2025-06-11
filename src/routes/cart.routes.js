const express = require('express');
const { body } = require('express-validator');
const { protect } = require('../middleware/auth.middleware');
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} = require('../controllers/cart.controller');

const router = express.Router();

// Validation middleware
const cartItemValidation = [
  body('gameId').isMongoId().withMessage('Invalid game ID'),
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
];

// All routes are protected
router.use(protect);

router.get('/', getCart);
router.post('/', cartItemValidation, addToCart);
router.put('/:itemId', cartItemValidation, updateCartItem);
router.delete('/:itemId', removeFromCart);
router.delete('/', clearCart);
module.exports = router;