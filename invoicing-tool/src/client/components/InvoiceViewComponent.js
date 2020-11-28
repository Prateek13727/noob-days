import React, {Component} from 'react';
import {Button, Panel} from 'react-bootstrap';
import ReactTable from './TableComponent';
import {getDateString} from '../utilities/commonUtilities';
import {renderBasicCustomerInfo, InputGroup} from '../utilities/userInterfaceHelper';

const InvoiceViewComponent = (props) => {
	const {selectedInvoice = {}} = props;
	const { invoiceNumber, 
			items=[], 
			customer={},
			generatedAt="",
			invoiceAmount=0,
			tax=0,
			discount=0 } = selectedInvoice;
	const {name = "Unknown customer", email=""} = customer;
	
	function getTableHeaders() {
		return ['Name', 'Quantity', 'Price'];
	}

	function getTableRows() {
		return items.map((item) => {
			const { name, quantity, price } = item;
			return {
				Name: name,
				Quantity: quantity,
				Price: price
			}
		})
	}

	function calculateSubTotal(){
		let subTotal=0;
		items.forEach((item) =>{
			const {price, quantity} = item;
			subTotal += (price * quantity);
		})
		return subTotal.toFixed(2);
 	}

 	function calculateTax(){
 		const subTotal = calculateSubTotal();
 		return subTotal*tax;
 	}

 	function calculateDiscount(){
 		const subTotal = calculateSubTotal();
 		return subTotal*discount;
 	}

 	function calculateGrandTotal(){
 		return (calculateSubTotal() + calculateTax() - calculateDiscount());
 	}

 	function renderBillingDetails(){
 		const taxLabel = tax ? `Tax(${tax*100}%):` : "Tax(%)";
		const taxAmount = `${calculateTax()}`;
		const discountLabel = discount ? 
				`Discount(${discount*100}%):` : "Discount(%)";
		const discountAmount = calculateDiscount();
		const subTotal = calculateSubTotal();
		const grandTotal = calculateGrandTotal();

		return <section className="invoiceView__billingDetails">
			<InputGroup 
				id="subTotal" 
				label="Sub Total:"
				type="text"
				value={subTotal ? subTotal : 0}
				readOnly />
			<InputGroup 
				id="tax" 
				label={taxLabel}
				type="text"
				value={taxAmount ? taxAmount : 0}
				readOnly />
			<InputGroup 
				id="discount" 
				label={discountLabel}
				type="text"
				value={discountAmount ? discountAmount : 0}
				readOnly />
			<InputGroup 
				id="grandTotal" 
				label="Grand Total:"
				type="text"
				value={grandTotal ? grandTotal : 0 }
				readOnly />
		</section>
 	}

	return <div className="invoiceView">
		<Panel>
		    <Panel.Heading className="invoiceView__header">
		    	Invoice Details
	    	</Panel.Heading>
		    <Panel.Body>
				<section className="invoiceView__main">
					<div className="row u-margin-bottom-small">
						<div className="col-1-of-2 invoiceView__headerLeft">
							<div className="invoiceView__headerLeft--title">
									Invoice
							</div>
							<div className="invoiceView__headerLeft--invoice-number">
									# INV{invoiceNumber}
							</div>
							<div className="invoiceView__headerLeft--date-time">
									{getDateString(generatedAt)}
							</div>
						</div>
						<div className="col-1-of-2 invoiceView__headerRight">
							<div className="invoiceView__headerRight--1">
								{renderBasicCustomerInfo(name, email)}
							</div>
							<div className="invoiceView__headerRight--2">
								<button className="pritntInvoice--btn">
									 <i className="fa fa-print"></i>
									 Print
								</button>
							</div>
						</div>
					</div>
					<div className="invoiceView__table">
						<ReactTable rows={getTableRows()} columns={getTableHeaders()} />
					</div>
					{renderBillingDetails()}
				</section>	    	
	    	</Panel.Body>
	  	</Panel>		
	</div>
}

export default InvoiceViewComponent;