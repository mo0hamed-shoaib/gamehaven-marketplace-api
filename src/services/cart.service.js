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
}
