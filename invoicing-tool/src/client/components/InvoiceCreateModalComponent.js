import React, {Component} from 'react';
import { Modal, Button } from 'react-bootstrap';
import CustomerFormComponent from './InvoiceCustomerFormComponent';
import ItemsFormComponent from './InvoiceItemsFormComponent';
import {renderBasicCustomerInfo} from '../utilities/userInterfaceHelper';
import {isEmpty} from '../utilities/commonUtilities';

const InvoiceCreateModalComponent = (props) => {
	const {
		showModal, 
		openItemForm,
		onCustomerModalClose, 
		onCustomerDataSubmit,
		onItemsDataSubmit,
		onSkip,
		newInvoiceNumber,
		customerData } = props;
		
	const { name ="", email="" } = !isEmpty(customerData) ? customerData.customer : {};

	function renderCustomerSubHeader() {
		return <h4 className="invoiceCustomerModal__subHeader">Customer Details</h4>
	}

	function renderItemsSubHeader() {
		return <h4 className="invoiceCustomerModal__subHeader
					u-font-weight-bold">
					Product Details	
				</h4>
	}

	function renderSkipButton() {
		return <Button 
			bsStyle="info"
			className="invoiceCustomerModal__skip-btn" 
			onClick={onSkip}>
			Skip
			<i className="fa fa-caret-right skip-btn--iframe" aria-hidden="true"></i>
		</Button>
	}

	return <div className="invoiceCustomerModal">
		<Modal show={showModal} onHide={onCustomerModalClose}>
		<Modal.Header closeButton>
			<Modal.Title>
				<span className="invoiceCustomerModal__header--1">Create New Invoice</span>
				<span className="invoiceCustomerModal__header--2">Order No - {newInvoiceNumber}</span>
			</Modal.Title>
		</Modal.Header>
		<Modal.Body>
			<div className="row u-no-margin-bottom">
				<div className="col-1-of-2">
				{
				openItemForm &&
					renderItemsSubHeader()
				||
					renderCustomerSubHeader()	     		
				}
				</div>
				<div className="col-1-of-2">
				{
				openItemForm  &&
					renderBasicCustomerInfo(name, email)
				||
		     		renderSkipButton()
				}
				</div>
			</div>      	
			{
				openItemForm &&
					<ItemsFormComponent onSubmit={onItemsDataSubmit}/>
				||
					<CustomerFormComponent onSubmit={onCustomerDataSubmit}/>	
			}
		</Modal.Body>
    </Modal>
	</div>
}

export default InvoiceCreateModalComponent;