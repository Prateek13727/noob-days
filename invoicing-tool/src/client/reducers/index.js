import { combineReducers } from 'redux';
import CreateInvoiceReducer from './reducer_createInvoice';
import InvoicesReducer from './reducer_invoices';

//any key we provide in combineReducers ends up as a key in global state
const rootReducer = combineReducers({
	newInvoice: CreateInvoiceReducer,
  	invoices: InvoicesReducer
});

export default rootReducer;
