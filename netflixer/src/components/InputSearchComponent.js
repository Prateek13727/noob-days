import React, {Component} from 'react';

const InputSearchComponent = (props) => {
	const { onFilter, placeholder } = props;
	return <div className="inputSearch">
		<div>
			<input 
				type="text" 
				placeholder={placeholder}
				className="inputSearch__input" 
				onChange={onFilter.bind(this)}>
			</input>		
		</div>
	</div>
}

export default InputSearchComponent;