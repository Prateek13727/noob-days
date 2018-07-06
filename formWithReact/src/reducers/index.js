import { combineReducers } from 'redux';
import { reducer as formReducer} from 'redux-form';
import WidgetCountReducer from './reducer_widgetCount';
import ResponseReducer from './reducer_response';
import WidgetStateReducer from './reducer_widgetState';
import FormDataReducer from './reducer_formData';

const rootReducer = combineReducers({
  form: formReducer,
  widgetCount: WidgetCountReducer,
  response: ResponseReducer,
  isDisabled: WidgetStateReducer,
  formData: FormDataReducer,
});

export default rootReducer;
