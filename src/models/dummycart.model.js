const mongoose = require('mongoose');

const dummyCartSchema = new mongoose.Schema({
    //store user id to reference user mdoel
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});
const dummyCart = mongoose.model('dummyCart', dummyCartSchema);
module.exports = dummyCart;