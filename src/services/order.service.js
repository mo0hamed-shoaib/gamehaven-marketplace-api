const Order = require('../models/order.model');
const Cart = require('../models/cart.model');
const Game = require('../models/game.model');

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

    static async createOrder(userId){
        const cart = await Cart.findOne({user: userId}).populate('items.game');
        if(!cart || cart.items.length === 0){
            throw new Error('cart is empty');
        }

        let total = 0;
        const orderItems = [];

        for (let item of cart.items){
            const game = await Game.findById(item.game._id);
            if(!game){
                throw new Error(`game ${item.game._id} not found`)
            }

            if(game.stock < item.quantity){
                throw new Error(`not enough stock for ${game.title}`)
            }

            game.stock -= item.quantity;
            await game.save();

            orderItems.push({
                game: game._id,
                quantity: item.quantity,
                price: game.price
            });

            total += game.price * item.quantity;
        }

        const order = await Order.create({
            user: userId,
            items: orderItems,
            total
        });

        cart.items = [];
        await Cart.save();
        
        return order.populate('items.game');
    }

    static async updateOrderStatus(orderId, status){
        const order = await Order.findById(orderId);

        if(!order){
            throw new Error('order not found');
        }

        order.status = status;
        await order.save();

        return order.populate('items.game');
    }
}

module.exports = OrderService;
