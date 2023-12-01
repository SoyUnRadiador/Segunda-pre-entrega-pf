const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  _id: Number, 
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
