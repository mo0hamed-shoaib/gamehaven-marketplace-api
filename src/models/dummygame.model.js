const mongoose = require('mongoose');

const dummygameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
},
  description: {
    type: String,
    required: true
},
  price: {
    type: Number,
    required: true,
    min: 0
},
  platform: {
    type: String,
    required: true,
    enum: ['PC', 'PlayStation', 'Xbox', 'Nintendo Switch']
},
  genre: {
    type: String,
    required: true,
    enum: ['Action', 'Adventure', 'RPG', 'Strategy', 'Sports', 'Racing', 'Puzzle']
},
  coverImage: {
    type: String,
    required: true
},
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0
},
rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
}
});

const dummyGame = mongoose.model('dummyGame', dummygameSchema);

module.exports = dummyGame;