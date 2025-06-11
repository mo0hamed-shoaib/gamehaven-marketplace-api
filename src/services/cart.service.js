const Cart = require('../models/cart.model');
const Game = require('../models/game.model');

class CartService {
  // Get user's cart
  static async getCart(userId) {
    const cart = await Cart.findOne({ user: userId }).populate('items.game');
    if (!cart) {
      cart = Cart.create({ user: userId, items: [] });
    }
    return cart;
  }

  // Add item to cart
  static async addToCart(userId, gameId, quantity) {
    const game = await Game.findById(gameId);
    if (!game) {
      const error = new Error('Game not found');
      error.status = 404;
      throw error;
    }
    if (game.stock < quantity) {
      throw new Error('Insufficient stock');
    }

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = await Cart.create({ user: userId, items: [] });
    }
    const itemIndex = cart.items.findIndex(item => item.game.toString() === gameId);
    if (itemIndex === -1) {
      // Add new item
      cart.items.push({ game: gameId, quantity });
    } else {
      // Update quantity if item exists
      cart.items[itemIndex].quantity += quantity;
    }
    await cart.save();
    return cart.populate('items.game');
  }

  // Update cart item quantity
  static async updateCartItem(userId, itemId, quantity) {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      const error = new Error('Cart not found');
      error.status = 404;
      throw error;
    }
    const item = cart.items.id(itemId);
    if (!item) {
      const error = new Error('Item not found in cart');
      error.status = 404;
      throw error;
    }
    const game = await Game.findById(item.game);
    if (game.stock < quantity) {
      throw new Error('Insufficient stock');
    }
    item.quantity = quantity;
    await cart.save();
    return cart.populate('items.game');
  }
  // Remove item from cart
  static async removeFromCart(userId, itemId) {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      const error = new Error('Cart not found');
      error.status = 404;
      throw error;
    }
    cart.items = cart.items.filter(item => item._id.toString() !== itemId);
    await cart.save();
    return cart.populate('items.game');
  }
  // Clear cart
  static async clearCart(userId) {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      const error = new Error('Cart not found');
      error.status = 404;
      throw error;
    }
    cart.items = [];
    await cart.save();
    return cart;
  }
}

module.exports = CartService;
