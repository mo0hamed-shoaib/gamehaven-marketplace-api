const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [
      {
        game: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Game',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    total: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Calculate total before saving
cartSchema.pre('save', async function (next) {
  try {
    let total = 0;
    for (const item of this.items) {
      const game = await mongoose.model('Game').findById(item.game);
      if (game) {
        total += game.price * item.quantity;
      }
    }
    this.total = total;
    next();
  } catch (error) {
    next(error);
  }
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
