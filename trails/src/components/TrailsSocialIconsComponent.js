import React, {Component} from 'react';
import facebookImg from "../images/facebook-48.png"
import twitterImg from "../images/twitter-48.png"
import redditImg from "../images/reddit-48.png"
import googleplusImg from "../images/googleplus-48.png"

const SocialIcons = (props) => {
	const {text, shareLink=""} = props;
	function getGooglePlusSharableLink(){
		return `https://plus.google.com/share?url=${encodeURIComponent(shareLink)}`
	}
	function  getTwitterSharableLink(){
		return `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareLink)}`
	}
	function getRedditSharableLink(){
		return `https://www.reddit.com/submit?url=${encodeURIComponent(shareLink)}`
	}
	function getFacebookSharableLink(){
		return `https://www.facebook.com/share.php?u=${encodeURIComponent(shareLink)}`;
	}

	return	<div className="socialIcons">	
		<h5 className="socialIcons__text">
			{
				text ? text : "Share to"
			}
		</h5>
		<a href={getFacebookSharableLink()} target="_blank">
			<img src={facebookImg} alt="facebook-logo" className="socialIcons__icon"/>
		</a>
		<a href={getTwitterSharableLink()} target="_blank">
			<img src={twitterImg} alt="twitter-logo" className="socialIcons__icon"/>
		</a>
		<a href={getRedditSharableLink()} target="_blank">
			<img src={redditImg} alt="reddit-logo" className="socialIcons__icon"/>
		</a>
		<a href={getGooglePlusSharableLink()} target="_blank">
			<img src={googleplusImg} alt="googleplus-logo" className="socialIcons__icon"/>
		</a>
	</div>	
}

export default SocialIcons;