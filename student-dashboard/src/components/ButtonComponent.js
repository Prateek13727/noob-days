import React, {Component} from 'react';

const ButtonComponent = ({ text, className, ...props }) => {
	return <div className="button">
		<div>
			<button
				className={className} 
				{...props}>
				{text}
			</button>		
		</div>
	</div>
}

export default ButtonComponent;