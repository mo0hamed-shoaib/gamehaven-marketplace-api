const express = require('express');
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
