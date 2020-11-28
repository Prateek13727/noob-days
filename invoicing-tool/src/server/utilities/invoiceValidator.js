const MESSAGE_INVALID_INVOICE = "Invoice data is invalid";
const MESSAGE_INVALID_ITEM_DATA = "One or more item(s) data is invalid";
const MESSAGE_VALID_DATA = "Good to go";

const validate = (data) => {
    const { tax, discount, items, customer } = data;
    if(!validateInvoiceData(data)) {
      return {
        isValid: false,
        errorMessage: MESSAGE_INVALID_INVOICE
      };
    }
    else if (!validateItems(items)) {
      return {
        isValid: false,
        errorMessage: MESSAGE_INVALID_ITEM_DATA
      };
    }
    return {
        isValid: true,
        errorMessage: MESSAGE_VALID_DATA
      };
}

const validateInvoiceData = (data) => {
    const { tax, discount, items, customer } = data;
    if ( tax > 1 || tax < 0  ) {
      return false;
    } 
    else if ( discount > 1 || discount < 0 ) {
      return false;
    }
    return true;
}

const validateItems = (items) => {
  if(items.length === 0) {
      return false;
  }
  for(let i=0; i<items.length;i++) {
    if(!items[i].price || !items[i].name || !items[i].quantity || items[i].quantity === 0 ) {
      return false;
    }
  }
  return true;
}


module.exports = {
  validate
}