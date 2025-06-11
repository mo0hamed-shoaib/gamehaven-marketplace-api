const CartService = require('../services/cart.service');
const { validationResult } = require('express-validator');

// @desc    Get user's cart
// @route   GET /api/cart
// @access  Private
const getCart = async (req, res) => {
  try {
    const cart = await CartService.getCart(req.user._id);
    res.json({
      status: 'success',
      data: { cart },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
const addToCart = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { gameId, quantity } = req.body;
    const cart = await CartService.addToCart(req.user._id, gameId, quantity);

    res.json({
      status: 'success',
      data: { cart },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update cart item
// @route   PUT /api/cart/:itemId
// @access  Private
const updateCartItem = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { quantity } = req.body;
    const cart = await CartService.updateCartItem(req.user._id, req.params.itemId, quantity);
    res.json({
      status: 'success',
      data: { cart },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
};
