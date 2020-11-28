const mongoose = require('mongoose');

const Invoice = mongoose.model('Invoice', {
  invoiceAmount: {
    type: Number,
    required: true,
    minlength: 1,
    trim: true
  },
  salesTax: {
    type: Number,
    required: true,
    minlength: 1,
    trim: true
  },
  generatedAt: {
    type: Number,
    default: null
  }
});

module.exports = { Invoice }
