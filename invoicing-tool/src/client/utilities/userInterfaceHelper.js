import React, {Component} from 'react';

import { 
	FormGroup, 
	FormControl, 
	ControlLabel, 
	HelpBlock } from 'react-bootstrap';

export function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

export function StaticFieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl.Static {...props} ></FormControl.Static>
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

export function InputGroup({ id, label, ...props }) {
  return (
    <div className="inputGroup">
      <label className="inputGroup__label" htmlFor={id}>{label}</label>
      <input className="inputGroup__input" id={id} {...props}></input>
    </div>
  );
}

export function renderBasicCustomerInfo(name, email){
    return <div className="customerInfo">
      <div className="customerInfo__title">
          Customer Details
      </div>
      <div className="customerInfo__name u-font-weight-bold">
          {name}
      </div>
      <div className="customerInfo__email">
          {email}
      </div>
    </div>
}
