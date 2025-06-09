const mongoose = require('mongoose');

const dummygameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
},
  description: {
    type: String,
    required: true
},
  price: {
    type: Number,
    required: true
},
  platform: {
    type: String,
    required: true
},
  genre: {
    type: String,
    required: true
},
  coverImage: {
    type: String,
    required: true
},
  stock: {
    type: Number,
    required: true
},
});

const Game = mongoose.model('TempGame', dummygameSchema);

module.exports = Game;