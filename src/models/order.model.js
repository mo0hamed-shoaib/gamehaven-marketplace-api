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
});
module.exports = Order;