import React, {Component} from 'react';
import { connect } from 'react-redux';
import { createInvoice, getExistingItems } from '../actions/index';
import InvoiceView from '../components/invoiceView';

class InvoiceDataComponent extends Component {	
	componentDidMount(){
		const { createInvoice } = this.props;
		createInvoice();
	}
	render() {
		return <div className="row">
			{ 
			 this.props && this.props.invoiceData &&
			 		<InvoiceView data={this.props.invoiceData} />
			}			
		</div>
	}
}

function mapStateToProps({ invoiceData }) {
  return { invoiceData };
}

export default connect(mapStateToProps, { createInvoice })(InvoiceDataComponent);

// var tableData = {
//   columns: ['Name', 'Quantity', 'Medical' 'Price', 'Tax', 'MRP'],
//   name, quantity, price, tax, medical

//   rows: [{
//     'Name': 'Veterinary Assitance',
//     'Quantity': 50,
//     'Price': '1 Hour',
//     'Tax': 12
//   }, {
//     'Service': 'Veterinary Assitance',
//     'Cost/Unit': 50,
//     'Unit': '1 Hour',
//     'Units Requested': 12
//   }, {
//     'Service': 'Veterinary Assitance',
//     'Cost/Unit': 50,
//     'Unit': '1 Hour',
//     'Units Requested': 12
//   }, {
//     'Service': 'Veterinary Assitance',
//     'Cost/Unit': 50,
//     'Unit': '1 Hour',
//     'Units Requested': 12
//   }, {
//     'Service': 'Veterinary Assitance',
//     'Cost/Unit': 50,
//     'Unit': '1 Hour',
//     'Units Requested': 12
//   }, {
//     'Service': 'Veterinary Assitance',
//     'Cost/Unit': 50,
//     'Unit': '1 Hour',
//     'Units Requested': 12
//   }, {
//     'Service': 'Veterinary Assitance',
//     'Cost/Unit': 50,
//     'Unit': '1 Hour',
//     'Units Requested': 12
//   }, {
//     'Service': 'Veterinary Assitance',
//     'Cost/Unit': 50,
//     'Unit': '1 Hour',
//     'Units Requested': 12
//   }, {
//     'Service': 'Veterinary Assitance',
//     'Cost/Unit': 50,
//     'Unit': '1 Hour',
//     'Units Requested': 12
//   }, {
//     'Service': 'foo',
//     'Unit': null,
//     'Cost/Unit': undefined,
//     'Units Requested': 42
//   }]
// };
