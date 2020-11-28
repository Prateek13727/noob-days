require("./config/config")

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./db/mongoose')
const {Item} = require('./models/item');
const {Invoice} = require('./models/invoice');

const app = express();

app.use(bodyParser.json());

app.post('/invoice', async(req, res) => {
  const { body } = req;
  try {
    const invoice = await createInvoice(body);
    const items = await createItems(body, invoice._id);
    const invoiceDetails = createResponse(items, invoice);
    res.send(invoiceDetails);
  } catch(err) {
    console.log(err);
    res.status(400).send(err);
  }
});

const createInvoice = (itemList) => {
  let invoiceAmount = 0;
  let salesTax = 0;
  itemList.forEach((item) => {
    const { name, quantity, medical, price, tax } = item;
    const calculatedPrice = medical ? price*quantity : (price*quantity)*(parseFloat(tax)+1);
    invoiceAmount = invoiceAmount + calculatedPrice;
    salesTax = salesTax + (price*quantity)*(tax);
  });
  const generatedAt = new Date().getTime();
  const invoice = new Invoice({
    invoiceAmount,
    salesTax,
    generatedAt,
  });
  return new Promise((resolve, reject) => {
    invoice.save().then((doc) => {
      resolve(doc);
    });
  })
}

const createItems = (items, invoiceId) => {
  const itemList = items.map((item) => {
    const { name, quantity, medical, price, tax } = item;
    return new Item({
      name, 
      quantity, 
      medical, 
      price, 
      tax,
      invoiceId
    });
  });

  return new Promise((resolve, reject) => {
    Item.insertMany(itemList).then((docs) => {
       resolve(docs);
    });
  });
}

const createResponse = (itemList, invoice) => {
  const {_id:invoiceId, invoiceAmount, salesTax, generatedAt } = invoice;
  const items = itemList.map((doc) => {
    const { name, quantity, medical, price, tax, invoiceId } = doc;
    const invoicedPrice = medical ? price*quantity : (price*quantity)*(parseFloat(tax)+1);
    return {
      name, 
      quantity, 
      medical, 
      price,
      tax,
      invoicedPrice
    }
  })
  return {
    invoiceId,
    invoiceAmount,
    salesTax,
    generatedAt,
    items
  };
}

app.listen(process.env.PORT, () => {
  console.log(`started on port ${process.env.PORT}`);
});

module.exports = {
  app
}