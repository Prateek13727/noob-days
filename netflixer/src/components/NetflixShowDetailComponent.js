import React, { Component } from 'react';
const EMBED_TRAILER_BASE_URL = "https://www.youtube-nocookie.com/embed/";
var images = require.context('../images/', true, /\.(png|jp(e*)g|svg)$/);

const NetflixShowDetailComponent = (props) => {
	const { selectedShow={}, imdbRating="", onBackToHomepage} = props;
	const { title, description, poster, year, trailer } = selectedShow;
	const trailersrc = `${EMBED_TRAILER_BASE_URL}${trailer}?rel=0&amp;amp;controls=0&amp;amp;showinfo=0`
	const imgsrc = images("./posters/"+poster);
	const backArrow = `src/images/back-arrow.png`;
	
	return <div 
		className="netflix__details">
		<header className="netflix__details--header">
			<div onClick={onBackToHomepage} className="tooltip netflix__details--back-arrow">   	
            	<i className="fa fa-angle-left"></i>
            	<span className="tooltiptext">Back to Browse</span>
        	</div>	
		</header>
		<main className="netflix__details--main">
			<section className="netflix__details--section">
				<div className="row">
					<div className="col-1-of-3 netflix__details--left">
						<div className="netflix__details--title">
							{title}
						</div>
						<div className="netflix__details--description">
							{description}
						</div>
						<div className="netflix__details--year">
							{year}
						</div>
					</div>
					<div className="col-1-of-3 netflix__details--imageBox">
	                	<img src={imgsrc} alt={title} className="netflix__details--image"/>
	            	</div>
					<div className="col-1-of-3 netflix__details--right">
						<p><a href="http://imdb.com" className="imdb--logo">IMDb</a></p>
						<div className="netflix__details--imdbRating">
							<span className="imdb--rating">{imdbRating}</span><span className="imdb--ten">/10</span>
						</div>
					</div>	
				</div>
			</section>
			<section className="netflix__trailer">
				<iframe className="netflix__trailer--iframe" src={trailersrc} height="100%" allowFullScreen={true}></iframe>
			</section>
		</main>			
	</div>
}


export default NetflixShowDetailComponent;