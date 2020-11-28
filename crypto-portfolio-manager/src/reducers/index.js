import { combineReducers } from 'redux';
import CryproListReducer from './reducer_cryptoList';
import UserCryptoListReducer from './reducer_userCryptoList';
import SelectedCryptoReducer from './reducer_selectedCrypto';
import cryptoPortfolioFilterReducer from './reducer_cryptoPortfolioFilterReducer';

//any key we provide in combineReducers ends up as a key in global state
const rootReducer = combineReducers({
  cryptoList: CryproListReducer,
  userCryptoData: UserCryptoListReducer,
  selectedCryptoId: SelectedCryptoReducer,
  cryptoPortfolioFilter: cryptoPortfolioFilterReducer
});

export default rootReducer;
