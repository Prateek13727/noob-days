import React, {Component} from 'react';
import {Label} from 'react-bootstrap';
import CompactViewComponent from './InvoiceCompactViewComponent';
import InputSearchComponent from './InputSearchComponent';

const InvoiceListComponent = (props) => {
	const { invoices, onSearchInvoice, onSelectInvoice } = props;
	const invoiceCount = invoices.length;
	return <div className="listView">
		<div className="listView__inputSearch">
			<InputSearchComponent
				onChange={onSearchInvoice} 
				placeholder="  search by InvID ..."/>
		</div>
		<div className="listView__invoiceCount">
		 	<Label>Invoices</Label>
		 	<div className="listView__invoiceCount--value">
			 	{invoiceCount}
		 	</div>
		</div>
		{
			invoices.map((invoice) => {
				return <div key={invoice._id}>
					<CompactViewComponent 
						invoice={invoice} 
						onSelectInvoice={onSelectInvoice}/>
				</div>
			})
		}
	</div>
}

export default InvoiceListComponent;