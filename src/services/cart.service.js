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
}
