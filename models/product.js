const mongoose = require('mongoose');
const express = require('express');

const productSchema = new mongoose.Schema({
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
  // Otros campos necesarios para el producto...
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
