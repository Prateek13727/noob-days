import React, { Component } from 'react';	

const FirstPage = (props) => {
	const { info={}, author={}, coverImage } = props;
	const { name="", image="", href="", handle="" } = author;
	const { counts:{posts=0, shares=0, views=0}={}, name:title="" } = info;
	return <div className="firstPage">
		<div className="background">
			<img src={coverImage} className="background__image"/>
		</div>
		<h2 className="firstPage__title">
			{title}
		</h2>
		<div className="firstPage__stats">
			<ul className="firstPage__stats-list">
				<li className="firstPage__stats-item">
					<span className="firstPage__stats-item-dot"></span>
					{posts} Posts	
				</li>
				<li className="firstPage__stats-item">
					<span className="firstPage__stats-item-dot"></span>
					{shares} Shares
				</li>
				<li className="firstPage__stats-item">
					<span className="firstPage__stats-item-dot"></span>
					{views} Views
				</li>
			</ul>
		</div>
		<section className="firstPage__author">
			<div className="row">
				<div className="col-1-of-2 firstPage__author-left">
					<div className="firstPage__author-trailBy">Trail By</div>
					<div className="firstPage__author-name">
						{name}
						<a className="firstPage__author-follow" 
							href={href}>
							Follow
						</a>
					</div>
				</div>
				<div className="col-1-of-2">
					<img src={image} alt={handle} className="firstPage__author-avatar" />
				</div>
			</div>
		</section>
	</div>
}

export default FirstPage;