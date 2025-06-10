const mongoose = require('mongoose');

const dummyCartSchema = new mongoose.Schema({
    //store user id to reference user mdoel
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    //cart items
    //array of cart items
    //this should be the way these cart items are stored
    items: [
        {
            //reference game id in game model
            game:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Game',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            }
        }
    ],
    total:{
        type: Number,
        required: true,
        default: 0
    }
});
const dummyCart = mongoose.model('dummyCart', dummyCartSchema);
module.exports = dummyCart;