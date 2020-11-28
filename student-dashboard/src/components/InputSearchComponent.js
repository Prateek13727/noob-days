import React, {Component} from 'react';

const InputSearchComponent = ({ ...props }) => {
	return <div className="inputSearch">
		<div>
			<input
				className="inputSearch__input" 
				{ ...props }>
			</input>		
		</div>
	</div>
}

export default InputSearchComponent;