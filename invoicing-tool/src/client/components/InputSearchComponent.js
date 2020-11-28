import React, {Component} from 'react';

const SearchDropdown = (props) => {
	const { onChange, placeholder } = props;
	return <div className="inputSearch">
		<div>
			<input 
				type="text"
				placeholder={placeholder}
				className="inputSearch__component" 
				onChange={onChange.bind(this)}>
			</input>		
		</div>
	</div>
}

export default SearchDropdown;