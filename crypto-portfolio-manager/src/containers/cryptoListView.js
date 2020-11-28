
import React, {Component} from 'react';
import { connect } from 'react-redux';
import Notifications, {notify} from 'react-notify-toast';
import { getListOfCryptoCurrencies, 
		addCryptocurrencyToUserWallet,
		deleteCryptocurrencyFromUserWallet,
		getCryptoCurrenciesFromUserWallet,
		selectCrypto,
		toggleFilterState } from '../actions/index';
import { CURRENCY, KEY_USER_CRYPTO } from '../utilities/env';	
import CryptoListTable from '../components/cryptoListTable'
import CryptoPortfolioTable from '../components/cryptoPortfolioTable'
import Header from '../components/header'


class CryptoListView extends Component {
	
	componentDidMount(){
		const { getListOfCryptoCurrencies, 
			getCryptoCurrenciesFromUserWallet } = this.props;
		getListOfCryptoCurrencies(1, 100, CURRENCY);
		getCryptoCurrenciesFromUserWallet(KEY_USER_CRYPTO);
	}

	validateForExistingCryptoInWallet(cryptoData) {
		const {userCryptoData} = this.props;
		if (userCryptoData[cryptoData.id]){
			return true;
		} else {
			return false;
		}
	}

	onCryptoBuy(cryptoData, event) {
		const { addCryptocurrencyToUserWallet } = this.props;
		addCryptocurrencyToUserWallet(cryptoData);
		const { symbol, price } = cryptoData;
		this.showNotification(`1 ${symbol} worth ${price} was addedt`, 
			'success', 
			3000, 
			{ background: '#0E1717', text: "#008000" });
	}

	onCryptoSell(cryptoData, event) {
		const { deleteCryptocurrencyFromUserWallet } = this.props;
		const { symbol, price } = cryptoData;
		if(!this.validateForExistingCryptoInWallet(cryptoData)) {
			this.showNotification(`${symbol} is not present in the wallet`, 
			'error', 
			3000, 
			{ background: '#FF0000', text: "#008000" });
		}
		deleteCryptocurrencyFromUserWallet(cryptoData);	
		this.showNotification(`1 ${symbol} worth ${price} was sold`, 
			'success', 
			1500, 
			{ background: '#FF0000', text: "#008000" });
	}

	getDefaultUserCryptoSelection() {
		const {userCryptoData} = this.props;
		const defaultKey = Object.keys(userCryptoData).length ?  Object.keys(userCryptoData)[0] : null;
		return defaultKey ? userCryptoData[defaultKey] : null;
	}

	getUserCryptoNameValueList() {
		const {userCryptoData} = this.props;
	  	return Object.keys(userCryptoData).map((key) => {
	  		const {totalWorth, name} = userCryptoData[key] ? userCryptoData[key] : {};
			return {
				value: totalWorth,
				name,
				key
			}
	  	})
  	}

  	getTotalPortfolioWorth() {
  		const {userCryptoData = []} = this.props;
  		return Object.keys(userCryptoData).reduce((totalWorth, key) => {
  			const price = userCryptoData[key]  ? userCryptoData[key].totalWorth : 0;
  			return totalWorth + price;	
  		} , 0);
	}

  	getSelectedCryptoData() {
		const { userCryptoData, selectedCryptoId:cryptoId } = this.props;
		return userCryptoData[cryptoId] ? userCryptoData[cryptoId] : {};
  	}

  	onViewPortfolio() {
  		const { toggleFilterState, cryptoPortfolioFilter } = this.props;
  		toggleFilterState(!cryptoPortfolioFilter);
  	}

  	showNotification(message, type, timeout, color) {
  		return notify.show(message, type, timeout, color)
  	}

	render() {
		const { cryptoList:rows, 
			userCryptoData, 
			selectCrypto,
			cryptoPortfolioFilter
		} = this.props;
		const userCryptoNameValueList = this.getUserCryptoNameValueList();
		const selectedCrypto = this.getSelectedCryptoData();
		const totalPortfolioWorth =  this.getTotalPortfolioWorth();
		const defaultUserCryptoValue = this.getDefaultUserCryptoSelection();
		return <div>
			<header>
				<Header 
					menuItems={userCryptoNameValueList} 
					selectedCrypto = {selectedCrypto}
					selectCrypto = {selectCrypto}
					totalPortfolioWorth={totalPortfolioWorth}
					defaultUserCryptoValue={defaultUserCryptoValue}
					onViewPortfolio = {this.onViewPortfolio.bind(this)}
					cryptoPortfolioFilterState={cryptoPortfolioFilter}
				/>
			</header>
			<main>
				<section className="section-table">
					{
						!cryptoPortfolioFilter &&
							<CryptoListTable 
								rows={rows} 
								onCryptoBuy={this.onCryptoBuy.bind(this)}
								onCryptoSell={this.onCryptoSell.bind(this)}
							/>	
						||
							<CryptoPortfolioTable 
								userCryptoData={userCryptoData} 
								onCryptoBuy={this.onCryptoBuy.bind(this)}
								onCryptoSell={this.onCryptoSell.bind(this)}
							/>
					}
				</section>				
			</main>
	  		<footer></footer>
	  		<Notifications options={{zIndex: 200, top: '70px'}} />
		</div>
	}
}

function mapStateToProps({cryptoList, 
		userCryptoData, 
		selectedCryptoId, 
		cryptoPortfolioFilter}) {
	return {
		cryptoList,
		userCryptoData,
		selectedCryptoId,
		cryptoPortfolioFilter
	}
}

export default connect(mapStateToProps, { 
	getListOfCryptoCurrencies, 
	addCryptocurrencyToUserWallet,
	deleteCryptocurrencyFromUserWallet,
	getCryptoCurrenciesFromUserWallet,
	selectCrypto,
	toggleFilterState
})(CryptoListView);
