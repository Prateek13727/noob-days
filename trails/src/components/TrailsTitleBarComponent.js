import React, { Component } from 'react';

const Title = (props) => {
	const {tracker, n_posts} = props;
	
	function renderCurrentPostIndex(){
		return <div className="titleBar__index">
				{tracker}/{n_posts}
		</div>
	}

	function renderLastPageTitle(){
		return <div className="titleBar__lastPage">
			That's it folks
		</div>
	}
	return <div className="titleBar">
		{
			tracker <= n_posts &&
				renderCurrentPostIndex()
			||
				renderLastPageTitle()
		}		
	</div>
}

export default Title;