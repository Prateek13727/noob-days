require("./config/config")

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./db/mongoose');
const path = require('path');
const {Invoice} = require('./models/invoice');
const {validate:validateInvoiceData} = require('./utilities/invoiceValidator');
const { createInvoice, generateNewInvoiceNumber } = require('./utilities/helper');
const publicPath = path.join(__dirname, '..', '..', 'dist');
const app = express();

app.use(express.static(publicPath));
app.use(bodyParser.json());

app.post('/invoice', async(req, res) => {
  const { body } = req;
  let invoice;
  try {
    const { isValid, errorMessage } = validateInvoiceData(body); 
    if(isValid) {
      const invoiceNumber = await generateNewInvoiceNumber();
      const invoiceData = {
        ...body,
        invoiceNumber
      }
      invoice = await createInvoice(invoiceData);  
      res.send(invoice); 
    } else {
       res.status(400).send(errorMessage);   
    }     
  } catch(err) {
    res.status(400).send(err);
  }
});

app.get('/invoice', async(req, res) => {
  const { body, query } = req;
  const {key=""} = query;
  //Check if key can be parsed into integer
  if(isNaN(parseInt(key))) {
    //search by customer name only
    findQuery = {customer: {name: key}}
  } else {
    //search invoice number or by customer name only
    findQuery = { $or: [{invoiceNumber: parseInt(key)}, {customer: {name: key}}] }
  }
  try {
    let data = await Invoice.find(findQuery);
    if(data.length) {
      //send matched results
      res.send(data);  
    } else {
      //If no matches against the query, send complete data
      data = await Invoice.find();
      res.send(data);  
    }
  } catch(err) {
    res.status(400).send(err);
  }  
})

app.get('/invoice/findById', async(req, res) => {
  const { body, query } = req;
  try {
    const data = await Invoice.find({_id: query.id}); 
    res.send(data);
  } catch(err) {
    res.status(400).send(err);
  }  
});

app.listen(process.env.PORT, () => {
  console.log(`started on port ${process.env.PORT}`);
});

module.exports = {
  app
}
