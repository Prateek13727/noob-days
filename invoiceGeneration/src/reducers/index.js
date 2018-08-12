import { combineReducers } from 'redux';
import FormReducer from './reducer_form';
import InvoiceReducer from './reducer_invoice';
//any key we provide in combineReducers ends up as a key in global state
const rootReducer = combineReducers({
  items: FormReducer,
  invoiceData: InvoiceReducer
});

export default rootReducer;
