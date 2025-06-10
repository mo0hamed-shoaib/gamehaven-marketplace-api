const Order = require('../models/order.model');
const dummyCart = require('../models/dummyCart.model');
const dummyGame = require('../models/dummyModel.model');

class OrderService{
    //get user orders
    static async getOrders(userId){
        //populate method replaces the referenced ObjectId 
        // in a document with the actual document it refers to
        return Order.find({user: userId}).populate('items.game').sort({ createdAt: -1 });
    }

    //get single order
    static async getOrder(userId, orderId){
        const order = await Order.findOne({
            _id: orderId,
            user: userId
        }).populate('items.game');

        if(!order){
            throw new Error('Order not found');
        }

        return order;
    }
}

module.exports = OrderService;