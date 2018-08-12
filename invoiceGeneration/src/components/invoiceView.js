import React, {Component} from 'react';
import { Link } from "react-router-dom";
import TableComponent from './table';

export default class InvoiceView extends Component {
	
	getTableHeaders() {
		return ['Name', 'Quantity', 'Medical', 'Price', 'Tax', 'MRP'];
	}

	getTableRows(data) {
		const { items = [] } = data;
		return items.map((item) => {
			const { name, quantity, price, medical, tax, invoicedPrice } = item;
			return {
				Name: name,
				Quantity: quantity,
				Medical: medical ? "Yes" : "No",
				Price: price,
				Tax: tax,
				MRP: invoicedPrice
			}
		});
	}

	render() {
		const { data } = this.props;
		const tableHeaders = this.getTableHeaders();
		const rows = this.getTableRows(data);
		const { salesTax, invoiceAmount } = data;
		return <div className="container">
			<div className="u-center-text u-margin-bottom-small">
              <h2 className="heading-secondary">
                  INVOICE
              </h2>                    
          	</div>
			<div className="row">
				<section class="section-invoice">
					<div className="item-table u-margin-bottom-small">
						<TableComponent rows={rows} columns={tableHeaders} />
					</div>
					<div className="invoice-btn u-margin-bottom-small">
						<div className="invoice-btn__salesTax">
			              <label htmlFor="salesTax" className="invoice__label">Sales Tax:</label>
			              <input name="salesTax" type="text" className="invoice__input" value={salesTax} 
			              	 id="salesTax" readOnly required />
			            </div>
			            <div className="invoice-btn__totalInvoice">
			              <label htmlFor="totalInvoice" className="invoice__label">Total Invoiced Amount:</label>
			              <input name="totalInvoice" type="text" className="invoice__input" 
			              value={invoiceAmount} id="totalInvoice" readOnly required />
			            </div>
		            </div>
		            <div className="navigation">
		            	<div>
			                <button className="btn navigation__addItem-btn" type="button">
			                    <Link to={`/`}>
			                      Add Item
			                    </Link>
			                </button>
		              	</div>	
		            </div>
	            </section>
            </div>
		</div>
	}
}
