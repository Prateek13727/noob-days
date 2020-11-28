const mongoose = require('mongoose');

const Item = mongoose.model('Item', {
  name: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  quantity: {
    type: Number,
    default: 1
  },
  medical: {
    type: Boolean,
    default: false 
  },
  price: {
    type: Number,
    default: 0.0
  },
  tax: {
    type: Number,
    default: 0.20
  },
  invoiceId: {
    type: String,
    required: true,
  }
});

module.exports = { Item }





















