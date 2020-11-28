import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import { FieldGroup, StaticFieldGroup, InputGroup } from '../utilities/userInterfaceHelper';
import { cloneObject } from '../utilities/commonUtilities';

class InvoiceCustomerItemComponent extends Component {
  	constructor(props){
  		super(props);
  		this.state = {
 			formData: {
 				0: {
 					itemName: "",
 					itemQuantity: 0,
 					itemPrice: 0
 				}
 			},
 			discount: 0,
 			tax: 0,
 			subTotal: 0,
 			grandTotal:0
  		}
  	}

  	addNewRow(){
  		const { formData } = this.state;
		const n_rows = Object.keys(formData).length;
		if (n_rows > 4) {
			return
		}
		const newFormData = cloneObject(formData);
		newFormData[n_rows] = {
			itemName: "",
			itemQuantity: 0,
			itemPrice: 0
		};
		this.setState({
			formData: newFormData 
		})
  	}

  	populateForm() {
  		const { formData } = this.state;
		const n_rows = Object.keys(formData).length;
		let rows = [];
		let i = 0;
		while(i < n_rows) {
			rows.push(this.renderRow(i, formData[i], i===n_rows-1));
			i++;
		}
		return rows;
  	}

  	renderRow(i, formData, isLastRow){
  		const itemId = `itemName_${i}`; 
  		const quantityId = `itemQuantity_${i}`; 
  		const priceId = `itemPrice_${i}`; 
  		return <div key={i} className="row u-no-margin-bottom">
  				<div className="col-2-of-4">
					<FieldGroup
			      		id={itemId}
			      		name="item"
			      		className="itemsForm__name"
			      		type="text"
			      		placeholder="Item name"
			      		value = {formData.itemName ? formData.itemName: "" }
			      		required
			    	/>
		    	</div>
		    	<div className="col-1-of-4">
			    	<FieldGroup
			      		id={quantityId}
			      		className="itemsForm__quantity"
			      		type="text"
			      		placeholder="0"
			      		pattern="^[0-9]*$"
			      		value = {formData.itemQuantity ? formData.itemQuantity : ""}
			      		required
			    	/>
		    	</div>
		    	<div className="col-1-of-4">
			    	<FieldGroup
			      		id={priceId}
			      		className="itemsForm__price"
			      		type="text"
			      		placeholder="0.0"
			      		pattern="^[0-9]{1,6}$"
			      		value = {formData.itemPrice ? formData.itemPrice : ""}
			      		required
			    	/>
			    	{
						isLastRow ? 
							<Button 
								bsStyle="primary"
								bsSize="small"
								className="u-margin-bottom-small"
								onClick={this.addNewRow.bind(this)}>
								Add
							</Button>
							: 
						null
					}
		    	</div>
	    	</div>
  	}

  	onChange(event){
  		const {id:fieldName,value} = event.target;
  		if(fieldName !== "tax" && fieldName !== "discount") {
  			const n_row = fieldName.split("_")[1];
			const prop = fieldName.split("_")[0];
			const { formData } = this.state;
			const newFormData = cloneObject(formData);
			newFormData[n_row][prop] = value;
			this.setState({
				formData: newFormData 
			})	
  		} else {
  			this.setState({
  				[fieldName]: value
  			})
  		}
		this.calcuateSubTotal();
  	}

  	calcuateSubTotal(){
		const {formData} = this.state;
		let subTotal = 0;
		Object.keys(formData).forEach((key) =>{
			const {itemPrice, itemQuantity} = formData[key];
			subTotal += (itemPrice * itemQuantity);
		})
		subTotal = subTotal.toFixed(2);
		this.setState({
			subTotal
		},() => this.calcuateGrandTotal())
  	}

  	calcuateGrandTotal(){
  		const {discount, tax, subTotal} = this.state;
  		const grandTotal = (subTotal*(1+(tax/100))*(1-(discount/100))).toFixed(2);
  		this.setState({
			grandTotal
		})
  	}

  	render(){
  		const {onSubmit} = this.props;
  		const {formData,discount, tax, subTotal, grandTotal} = this.state;
  		return (
			<form 
				onSubmit={onSubmit.bind(this,formData)}
				onChange={this.onChange.bind(this)}>
				<div className="itemsForm row u-no-margin-bottom">
					<h6 className="col-2-of-4 itemName--header">
						Name
					</h6>
					<h6 className="col-1-of-4 itemQuantity--header">
						Quantity
					</h6>
					<h6 className="col-1-of-4 itemPrice--header">
						Price
					</h6>
				</div>
				{this.populateForm()}
				<div className="row u-no-margin-bottom">
					<div className="col-1-of-4">
						<FieldGroup
				      		className="itemsForm__input--tax"
				      		label="Tax"
				      		id="tax"
				      		type="text"
				      		placeholder="Tax %"
				      		pattern="^[0-9]*$"
				      		value = {tax ? tax : ""}
				      	/>		
					</div>
					<div className="col-1-of-4">
						<FieldGroup
				      		className="itemsForm__input--discount"
				      		label="Discount"
				      		id="discount"
				      		type="text"
				      		placeholder="Discount %"
				      		pattern="^[0-9]*$"
				      		value = {discount ? discount : ""}
				      	/>
					</div>
					<div className="col-1-of-4 u-float-right">
						<InputGroup
							id="modal__subTotal"
			      			label="SubTotal"
				      		type="text"
				      		placeholder="0"
				      		value = {subTotal ? subTotal : ""}
				      		readOnly
				      	/>		
					</div>
				</div>
				<div className="row">
					<div className="col-2-of-4">
					</div>
					<div className="col-1-of-4 itemForm__grandTotal">
						<InputGroup
							id="modal__grandTotal"
				      		label="GrandTotal"
				      		type="text"
				      		placeholder="0"
				      		value = {grandTotal ? grandTotal : ""}
				      		readOnly
				      	/>		
					</div>
					<div className="col-1-of-4 u-float-right">
						<Button bsSize="large" bsStyle="success" type="submit">Save</Button>
					</div>
				</div>
			</form>
		);
  	}
}

export default InvoiceCustomerItemComponent;