import React, {Component} from 'react';
import {getShortDate} from '../utilities/commonUtilities';

const InvoiceCompactViewComponent = (props) => {
	const { invoice, onSelectInvoice } = props;
	const { invoiceNumber, 
			items, 
			customer={},
			generatedAt="",
			invoiceAmount } = invoice;
	const {name="Unknown customer"} = customer;
	const itemCount = items.length;

	return <div className="invoiceCompactView" 
			onClick={onSelectInvoice.bind(this, invoice)}>
				<div className="row u-no-margin-bottom">
					<div className="col-1-of-2 compactView__leftDetails">
						<div className="compactView__leftDetails--invoice-number">
							INV # - {invoiceNumber}
						</div>
						<div className="compactView__leftDetails--items-count">
							Items - {itemCount}
						</div>
						<div className="compactView__leftDetails--customer-name">
							{name}
						</div>
					</div>
					<div className="col-1-of-2 compactView__rightDetails">
						<div className="compactView__rightDetails--date-time">
							{getShortDate(generatedAt)}
						</div>
						<div className="compactView__rightDetails--total-cost">
							&#8377; {invoiceAmount.toFixed(2)}
						</div>
					</div>
				</div>
				<hr />
	</div>
}

export default InvoiceCompactViewComponent;