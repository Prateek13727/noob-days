import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import { FieldGroup } from '../utilities/userInterfaceHelper';

const InvoiceCustomerFormComponent = (props) => {
  	const {onSubmit} = props;
	return (
		<form onSubmit={onSubmit.bind(this)}>
			<div className="row u-no-margin-bottom">
				<div className="col-1-of-2">
					<FieldGroup
	      				id="customerName"
	      				type="text"
      					label="Customer Name"
	      				placeholder="Customer name"
	      				required
		    		/>
				</div>
				<div className="col-1-of-2">
					<FieldGroup
						id="customerPhone"
						type="tel"
						label="Phone Number"
						pattern="^[0-9]{10}$"
						help="Should be 10 digits"
						required/>
				</div>
			</div>
			<div className="row u-no-margin-bottom">
				<div className="col-1-of-2 ">
					<FieldGroup
			      		id="customerAddress"
			      		type="text"
			      		label="Address"
			      		placeholder="Customer address"
			      		componentClass="textarea"
			    	/>
		    	</div>
		    	<div className="col-1-of-2">
					<FieldGroup
		      			id="customerEmail"
		      			type="email"
		      			label="Email"
		      			placeholder="Customer Email"
		      			required
		    		/>
		    		<FieldGroup
						id="customerPincode"
						type="text"
						label="Pincode"
						placeholder="5 6 0 0 6 7"
						pattern="^[0-9]{6}$"
						help="Should be 6 digits"
						maxLength="6"
		    		/>	
				</div>				
			</div>
			<div className="row">
				<Button 
					bsStyle="success"
					className="invoiceCustomerForm__submit--btn" 
					type="submit">
					Proceed
				</Button>
			</div>
		</form>
	);
}

export default InvoiceCustomerFormComponent;