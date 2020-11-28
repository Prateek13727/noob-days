import React, { Component } from 'react';
import CardComponent from './NetflixShowCardComponent';
import InputSearchs from './InputSearchComponent';

const NetflixShowsListComponent = (props) => {
	
	const {onFilter, showList, onSelectShow} = props;

	function renderTVShows(){
		return showList.map((show) => {
			const {imdbID} = show;
			return <div key={imdbID} className="col-1-of-4">
				<CardComponent 
					show={show}
					onSelectShow={onSelectShow}
				/>
			</div>
		});
	}
	
	return <div>
		<header className="netflix__inputSearch">
			<InputSearchs 
				placeholder="Search By Titles ..."		
				onFilter={onFilter}
			/>
		</header>
		<main>
			<div className="row">
				{renderTVShows()}
			</div>
		</main>
	</div> 
}

export default NetflixShowsListComponent;