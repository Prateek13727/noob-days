import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Navbar, Button, Alert} from 'react-bootstrap';
import Notifications from 'react-notify-toast';

import ListComponent from '../components/InvoiceListComponent';
import ViewComponent from '../components/InvoiceViewComponent';
import CreateModalComponent from '../components/InvoiceCreateModalComponent';
import {isEmpty, showNotification} from '../utilities/commonUtilities';

import { getInvoices,
		createInvoice 
} from '../actions/index';

class InvoiceContainerComponent extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			showModal: false,
			selectedInvoice: {},
			customerData: {},
			itemsData:{},
			openItemForm: false
		}
	}

	componentDidMount(){
		const {getInvoices, invoices} = this.props;
		getInvoices();
	}

	componentDidUpdate(prevProps, prevState) {
		const {getInvoices, newInvoice} = this.props;
	  	if (newInvoice.invoiceNumber !== prevProps.newInvoice.invoiceNumber) {
		    getInvoices();
	  	}
	}
	onCustomerModalOpen(){
		this.setState({
			showModal: true		
		})
	}

	onCustomerModalClose(){
		this.setState({
			showModal: false
		})
	}

	onCustomerDataSubmit(event){
		const { customerName:{value:name},
				customerAddress:{value:address},
				customerEmail:{value:email},
				customerPhone:{value:phone},
				customerPincode:{value:pincode}} = event.target;
		const customerData = {
			customer: {
				name,
				address,
				email,
				phone,
				pincode
			}
		}
		this.setState({
			customerData,
			openItemForm: true
		})
	}

	onItemsDataSubmit(formData, event){
		const { updateItemsFormData } = this.props;
		const items = Object.keys(formData).map((key) =>{
			const {
				itemName:name, 
				itemPrice:price, 
				itemQuantity:quantity } = formData[key];
			return {
				name,
				price,
				quantity
			}
		})
		const { 
			tax:{value:tax},
			discount:{value:discount}} = event.target;
		const itemsData = {
			items,
			tax: (tax/100),
			discount: (discount/100)
		}
		this.setState({
			itemsData
		},() => this.onInvoiceSave())		
	}

	onSearchInvoice(event){
		const {getInvoices} = this.props;
		getInvoices(event.target.value);
	}

	onSelectInvoice(selectedInvoice) {
		this.setState({
			selectedInvoice
		})
	}

	onInvoiceSave(){
		const {createInvoice} = this.props;
		const { 
			customerData, 
			itemsData } = this.state;
		const invoiceData = {
			...customerData,
			...itemsData
		}
		createInvoice(invoiceData);
		this.setState({
			customerData: {},
			itemsData: {},
			openItemForm: false
		})
		this.onCustomerModalClose();
		showNotification(`New Invoice added`, 
			'success', 
			3000, 
			{ background: '#0E1717', text: "#008000" });
	}

	getCurrentInvoice(){
		const { invoices, newInvoice } = this.props;
		const { selectedInvoice } = this.state;
		return !isEmpty(selectedInvoice) ? selectedInvoice : 
									!isEmpty(newInvoice) ? newInvoice :
									invoices.length ? invoices[0] : {};
	}

	onSkip(){
		this.setState({
			openItemForm: true
		})
	}

	render() {
		const {invoices} = this.props;
		const {showModal, 
			customerData, 
			selectedInvoice, 
			openItemForm} = this.state;
		const newInvoiceNumber  = invoices.length + 1;
		const currentInvoice = this.getCurrentInvoice();
		return <div className="invoiceTool">
			<div className="row invoiceTool__navbar u-no-margin-bottom">
				 <a  
				  	className="invoiceTool__dashboard" 
				  	href="#home">
				  Dashboard
				  </a>
			</div>
			<main>
				<div className="invoiceTool__addInvoice">
					<button 
						className="no-pads addInvoice--btn"
						onClick={this.onCustomerModalOpen.bind(this)} >
						<i className="fa fa-plus addInvoice--iframe"></i>
					</button>
				</div>
				<div className="row">
					<section className="col-1-of-4">
						<ListComponent 
							invoices={invoices} 
							onSearchInvoice={this.onSearchInvoice.bind(this)} 
							onSelectInvoice={this.onSelectInvoice.bind(this)}/>	
					</section>
					<section className="col-3-of-4 u-margin-top-medium">
						<ViewComponent selectedInvoice={currentInvoice} />	
					</section>
				</div>
			</main>
			<footer>
			</footer>
			<Notifications options={{zIndex: 200, top: '30px'}} />
			<CreateModalComponent
				showModal={showModal}
				openItemForm={openItemForm}
				onCustomerModalClose={this.onCustomerModalClose.bind(this)}
				onCustomerDataSubmit={this.onCustomerDataSubmit.bind(this)} 
				onItemsDataSubmit={this.onItemsDataSubmit.bind(this)} 	
				onSkip={this.onSkip.bind(this)}			
				newInvoiceNumber={newInvoiceNumber}
				customerData={customerData}/>
		</div>
	}
}

function mapStateToProps({
	newInvoice, 
	invoices
}) {
	return {
		newInvoice,
		invoices
	}
}

export default connect(mapStateToProps, { 
 	getInvoices, 
	createInvoice 
})(InvoiceContainerComponent);



