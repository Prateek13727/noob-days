import React, { Component } from 'react';
import ShowMore from 'react-show-more';
import SocialIconsComponent from './TrailsSocialIconsComponent';
import {getRelativeFilepath} from '../utilities/helper'
import saveImg from '../images/save-32.png'
import shareImg from '../images/share-32.png'

const Post = (props) => {
	const { posts, 
		tracker, 
		showSocialIcons, 
		toggleSocialIconsState } = props;
	const post = posts[tracker-1];
	const {	about, 
			imageList:{medium:imagesrc, mega:imagesrcmega}, 
			checkInLocation,
			isVideo,
			geoChatVideo:video } = post;

	function renderImage(){
		const srcset = `${imagesrcmega} 1027w, ${imagesrc} 685w`;
		return <img srcSet={srcset} 
			alt={about} 	
			className="post__image" 
			img={imagesrc} />
	}

	function renderVideo(){
		return <video className="post__video" controls>
	  		<source src={video} type="video/mp4" />
			Your browser does not support the video tag.
		</video>
	}

	return <div className="post">	
			<div className="post__header-left">
				<div className="post__location">
					<i className="fa fa-map-marker">
						<span className="post__location-text">
							{checkInLocation}
						</span>
					</i>
				</div>
			</div>
			<div className="post__header-right">
				<div className="post__saveText">Save</div>
				<a className="post__save" 
					href={getRelativeFilepath(imagesrc)} 
					download>
					<img src={saveImg} alt="save-image" className="post__saveImage"/>			
				</a>
				<div className="post__shareText">Share</div>
				<a className="post__share"
					href="#"
					onClick={toggleSocialIconsState}
					>
					{
					showSocialIcons &&	
							<img src={shareImg} alt="save-image" className="post__shareActiveImage"/>
						||
							<img src={shareImg} alt="share-img" className="post__shareImage"/>
					}
				</a>
			</div>
			<div className="post__media-container">
				{
					isVideo &&
						renderVideo()
					||
						renderImage()
				}
			</div>
		<div className="post__about">
			<ShowMore
                lines={1}
                more='more'
                less='less'
                anchorClass='post__about-achorClass'>
        		{about}
	        </ShowMore>
        </div>
        <div className="post__socialIcons">
	        {		
				showSocialIcons &&	
						<SocialIconsComponent shareLink={imagesrc}/>
			}	
		</div>
	</div>
}
export default Post;