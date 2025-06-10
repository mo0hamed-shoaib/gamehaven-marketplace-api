const Order = require('../models/order.model');
const dummyCart = require('../models/dummyCart.model');
const dummyGame = require('../models/dummyModel.model');

class OrderService{
    //get user orders
    static async getOrders(userId){
        return Order.find({user: userId}).populate('items.game').sort({ createdAt: -1 });
    }
}

module.exports = OrderService;