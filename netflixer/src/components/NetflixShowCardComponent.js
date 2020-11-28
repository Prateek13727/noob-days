import React, { Component } from 'react';
var images = require.context('../images/', true, /\.(png|jp(e*)g|svg)$/);

const NetflixShowCardComponent = (props) => {
	const { show, onSelectShow } = props;
	const { title, description, poster, year, imdbID } = show;
    const imgsrc = images("./posters/"+poster);

	return <div className="card card--animated">
        <div className="card__face card__face--front">
            <div onClick={onSelectShow.bind(this, show)} className="card__imageBox">
                <img src={imgsrc} alt={title} className="card__image"/>
            </div>         
		</div>
        <div className="card__face card__face--back">
            <div className="card__details">
                <p>
                    {description}
                </p>    
            </div>   
        </div>
	</div>
}

export default NetflixShowCardComponent;


