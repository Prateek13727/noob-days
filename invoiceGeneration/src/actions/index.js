import axios from 'axios';

import { guidGenerator, getDataFrmLocalStorageByKey } from '../utilities/utilities';

export const ADD_ITEM = "add_item";
export const CLEAR_SESSION_DATA = "clear_session_data";
export const CREATE_INVOICE = "create_invoice";
export const PERSISTENT_ITEMS = "persistent_items";

export function addItem(item) {
  //addItem is an action creator.It needs to return an action.
  //an object with a type property
  return {
    type: ADD_ITEM,
    payload: item
  }
}

export function getExistingItems() {
  const persistentItems = localStorage.getItem('items')
  let items = [];
  if(!persistentItems) {
    items = [];
  } else {
    items = JSON.parse(persistentItems);
  }
  return {
    type: PERSISTENT_ITEMS,
    payload: items
  }
}

export function clearSessionData() {
	return {
  		type: CLEAR_SESSION_DATA
	}
}

export function createInvoice() {
  let items = [];
  const persistentItems = localStorage.getItem('items');
  if(!persistentItems) {
    items = [];
  } else {
    items = JSON.parse(persistentItems);
  }

  const invoiceData = axios({
       method: 'post',
       url: '/invoice',
       data: items
  })

	return {
		type: CREATE_INVOICE,
		payload: invoiceData
	}
}

// function getDummyData() {
//   return [{
//     name: "item1",
//     price: 100,
//     quantity: 1,
//     medical: false,
//     tax: 0.20,
//     invoicedPrice: 120 
//   }];
// }

// export function generatedInvoice() {
//   const items = getDataFrmLocalStorageByKey('items');
//   const invoiceData = createInvoice(items);
//   return {
//     type: CREATE_INVOICE,
//     payload: invoiceData
//   }
// }

// function createInvoice(itemList) {
//   let salesTax = 0;
//   let invoiceAmount = 0;
//   const items = itemList.map((item) => {
//     const { name, quantity, medical, price, tax } = item;
//     const calculatedPrice = medical ? price*quantity : (price*quantity)*(parseFloat(tax)+1);
//     invoiceAmount = invoiceAmount + calculatedPrice;
//     salesTax = salesTax + (price*quantity)*(tax);
//     return {
//       ...item,
//       invoicedPrice: calculatedPrice
//     }
//   });
//   const invoiceId = guidGenerator();
//   const generatedAt = new Date().getTime();
//   const invoice = {
//     invoiceId,
//     invoiceAmount,
//     salesTax,
//     generatedAt,
//     items
//   };
//   return new Promise((resolve, reject) => {
//     resolve(invoice);
//   });
// }