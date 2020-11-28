const {Invoice} = require('../models/invoice');

const createInvoice = (data) => {
  let invoiceAmount = 0;
  const { items, tax, discount, customer, invoiceNumber } = data;
  items.forEach((item) => {    
    const { price, quantity } = item;
    //total invoiced price
    invoiceAmount += price;
  });
  //applying tax
  invoiceAmount = (invoiceAmount)*(1+tax);
  //applying discount
  invoiceAmount = invoiceAmount*(1-discount);
  const generatedAt = new Date().getTime();
  const invoice = new Invoice({
    items,
    customer,
    discount,
    tax,
    invoiceAmount,
    invoiceNumber,
    generatedAt,
  });
   
  return new Promise((resolve, reject) => {
    invoice.save().then((doc) => {
      resolve(doc);
    });
  })
}

const generateNewInvoiceNumber = async() => {
  const data = await Invoice.find(); 
  return data.length+1;
}


module.exports = {
  createInvoice,
  generateNewInvoiceNumber
}