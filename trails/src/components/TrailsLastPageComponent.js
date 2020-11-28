import React, { Component } from 'react';
import SocialIconsComponent from './TrailsSocialIconsComponent';
import likeImg from "../images/hearts-64.png";
import commentImg from "../images/comments-64.png";

const LastPage = (props) => {
	const { info={}, author={}, coverImage } = props;
	const { name="", image="", href="", handle="" } = author;
	const { counts:{loves=0, comments=0}={}, name:title="" } = info;
	return <div className="lastPage">
		<div className="background">
			<img src={coverImage} className="background__image"/>
		</div>
		<section className="lastPage__social-stats">
			<div className="lastPage__like">
				<img className="lastPage__likeImg" src={likeImg} />
				<h5 className="lastPage__text">{loves} likes</h5>
			</div>
			<div className="lastPage__comments">
				<img className="lastPage__commentImg" src={commentImg} />
				<h5 className="lastPage__text">{comments} comments</h5>
			</div>
		</section>
		<section className="lastPage__social">	
			<SocialIconsComponent 
			shareLink={coverImage}
			text="Share trail videos to" />			
		</section>
		<section className="lastPage__author">
			<h5 className="lastPage__text">View more Trails By</h5>
			<img src={image} alt={handle} className="lastPage__author-avatar" />
			<div className="lastPage__text">{name}</div>
		</section>
	</div>
}

export default LastPage;