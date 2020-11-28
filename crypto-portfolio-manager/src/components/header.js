import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import green from '@material-ui/core/colors/green';
import {CURRENCY} from '../utilities/env';
import ControlledOpenSelect from './controlledOpenSelect';

const Header = function(props) {
	const { menuItems,
	 selectedCrypto={}, 
	 selectCrypto={}, 
	 totalPortfolioWorth,
	 defaultUserCryptoValue: defaultValue,
	 onViewPortfolio,
	 cryptoPortfolioFilterState
	} = props;
	const { symbol, totalWorth, quantity } = selectedCrypto;
	const portfolioBtnText  = cryptoPortfolioFilterState ? 'Go Back' : "View my portfolio";
	return <div className="header">
  		<section className="userPorfolio">
  			<div className="userPorfolio__dropdown">
  				<ControlledOpenSelect menuItems={menuItems} defaultValue={defaultValue} selectCrypto={selectCrypto} />
  			</div>
  			<div className="userPorfolio__currencyQuantity">
  				<TextField
		          id="crypto-quantity"
		          label={symbol ? symbol : "Symbol"}
		          margin="normal"
		          value={ quantity ? quantity : 0}
		        />
  			</div>
  			<div className="userPorfolio__currencyValue">
  				<TextField
		          id="crypto-value"
		          label={CURRENCY}
		          margin="normal"
		          value={totalWorth ? totalWorth.toFixed(2) : 0}
		          InputProps={{
		            readOnly: true,
		          }}
		        />
  			</div>
  			<div className="userPorfolio__totalPortfolioWorth">
  				<TextField
		          id="crypto-value"
		          label={`Total Worth (${CURRENCY})`}
		          margin="normal"
		          value={totalPortfolioWorth ? totalPortfolioWorth.toFixed(2) : 0}
		          InputProps={{
		            readOnly: true,
		          }}
		        />
  			</div>
  			<div className="userPorfolio__viewPortfolio">
				<Tooltip title={portfolioBtnText}>
					<Button size="small" style={{ backgroundColor: green[400] }} variant="contained" onClick={onViewPortfolio} >
					  {portfolioBtnText}
					</Button>
				</Tooltip>
  			</div>
  		</section>
 	</div>
};

export default Header;