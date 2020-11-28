import React, { Component } from 'react';
import Axios from '../utilities/axios';
import FirstPage from '../components/TrailsFirstPageComponent';
import LastPage from '../components/TrailsLastPageComponent';
import Post from '../components/TrailsPostComponent';
import TitleBar from '../components/TrailsTitleBarComponent';
import { getRandomNumber, throttle } from '../utilities/helper';
import { TRELL_GET_DATA_API } from '../utilities/env';

class TrailsContainerComponent extends Component {
	constructor(props){
		super(props);
		this.state = {
			tracker: 0,
			trailsData: {},
			showSocialIcons: false
		}
		this.onNextPostFunc = throttle(this.onNextPost.bind(this), 500);
		this.onPreviousPostFunc = throttle(this.onPreviousPost.bind(this), 500);
		this.toggleSocialIconsState = this.toggleSocialIconsState.bind(this);
	}

	componentDidMount(){
		Axios.get(TRELL_GET_DATA_API)
			.then(res => {
				if(!res.error) {
					this.setState({
    					trailsData: res.data			
        			})
				}
      		})
	}

	renderLeftNavigation(){
		return <div className="trails__backNavigation u-margin-right-small" 
					onClick={this.onPreviousPostFunc} >
				<i className="fa fa-angle-left trails__backNavigation--arrow"></i>	
		</div>
	}

	renderRightNavigation(){
		return <div className="trails__forwardNavigation"
						onClick={this.onNextPostFunc} >
				<i className="fa fa-angle-right trails__forwardNavigation--arrow"></i>
		</div>
	}

	onPreviousPost(){
		this.setState((prevState) => ({
			showSocialIcons: false,
			tracker: prevState.tracker-1		
		}))
	}

	onNextPost(){
		this.setState((prevState) => ({
			showSocialIcons: false,
			tracker: prevState.tracker+1		
		}));
	}

	toggleSocialIconsState(){
		this.setState((prevState) => ({
			showSocialIcons: !prevState.showSocialIcons
		}))
	}

	getCoverImage(posts){
		const number = getRandomNumber(0, posts.length-1);
		return posts[number] ? posts[number].imageList.medium : "";
	}

	render() {
		const { tracker, trailsData:{data ={}}, showSocialIcons } = this.state;
		const { author, info, posts=[] } = data;
		const n_posts = posts.length;
		const imagesrc = this.getCoverImage(posts);
		return (
			<div className="container">
				<header className="trails__header">
					<TitleBar 
						n_posts={n_posts} 
						tracker={tracker}
					/>
				</header>
				<main className="trails">
					{
						tracker >= 1 &&
							this.renderLeftNavigation()
					}
					<div className="trails__post u-margin-right-small">
					{
						tracker === 0 &&
							<FirstPage coverImage={imagesrc} author={author} info={info} />
						||
							tracker === (n_posts+1) &&
								<LastPage coverImage={imagesrc} author={author} info={info} />
							||
								<Post 
									tracker={tracker} 
									posts={posts} 
									toggleSocialIconsState={this.toggleSocialIconsState}
									showSocialIcons={showSocialIcons}
								/>							
					}
					</div>
					{
						tracker <= n_posts &&
							this.renderRightNavigation()
					}
				</main>
			</div>
		)
	}
}

export default TrailsContainerComponent;