import React, { Component } from 'react';

function InputGroupComponent({ id, label, ...props }){
  return (
    <div className="inputGroup">
      <label className="inputGroup__label" htmlFor={id}>{label}</label>
      <input className="inputGroup__input" id={id} {...props}></input>
    </div>
  );
}

export default InputGroupComponent;
