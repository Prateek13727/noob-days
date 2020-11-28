const mongoose = require('mongoose');

const Invoice = mongoose.model('Invoice', {  
  invoiceNumber: {
    type: Number,
    required: true,
  },
  invoiceAmount: {
    type: Number,
    required: true,
  },
  tax: {
    type: Number,
    required: true,
    default: 0.0,
  },
  discount: {
    type: Number,
    required: true,
    default: 0.0,
  },
  items: [
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  customer: {
    email: {
      type: String,
    },
    name: {
      type: String,
    },
    address: {
      type: String,
    },
    phone:{
      type: String,
    },
    pincode:{
      type: String,
    }
  },
  generatedAt: {
    type: Number,
    default: null
  }
});

module.exports = { Invoice }
