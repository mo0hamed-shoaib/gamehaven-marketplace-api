//TODO: model
const mongoose = require('mongoose');
const dummyGame = require('./dummygame.model');
const dummyCart = require('./dummycart.model')
const orderSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    items: [
        {
            game: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Game',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            },
            price: {
                type: Number,
                required: true
            }
        }
    ]
});
module.exports = Order;