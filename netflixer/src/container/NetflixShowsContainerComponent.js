import React, {Component} from 'react';
import { connect } from 'react-redux';
	
import ListComponent from '../components/NetflixShowsListComponent';
import CardComponent from '../components/NetflixShowCardComponent';
import DetailComponent from '../components/NetflixShowDetailComponent';
import { getShows, 
		getShowByImdbID,
		selectShow,
		unselectShow,
		getIMDBRatingForShow 
} from '../actions/index';

class NetflixShowsContainerComponent extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			showDropdownContent: false
		}
	}

	componentDidMount(){
		const { getShows } = this.props;
		getShows();
	}

	onSelectShow(show){
		const { selectShow, getIMDBRatingForShow } = this.props;
		selectShow(show);
		getIMDBRatingForShow(show.imdbID);
	}

	onBackToHomepage(){
		const { unselectShow } = this.props;
		unselectShow();
	}

	onFilter(event){
		const { getShows } = this.props;
		const inputString = event.target.value;
		getShows(inputString);
	}

	render() {
		const { showList, selectedShow, imdbRating } = this.props;
		return <div className="netflix">
			<header>
				
			</header>
			<main>
				<section>
				{
					selectedShow && selectedShow.imdbID ?
						<DetailComponent 
							selectedShow={selectedShow} 
							imdbRating={imdbRating} 
							onBackToHomepage={this.onBackToHomepage.bind(this)}
						/>
					:

						<ListComponent 
							onSelectShow={this.onSelectShow.bind(this)} 
							showList={showList}
							onFilter={this.onFilter.bind(this)} />
				}
				</section>
			</main>
			<footer>
			</footer>
		</div>
	}
}

function mapStateToProps({
	showList, 
	selectedShow, 
	imdbRating
}) {
	return {
		showList,
		selectedShow,
		imdbRating
	}
}


export default connect(mapStateToProps, { 
	getShows, 
	getShowByImdbID,
	selectShow,
	unselectShow,
	getIMDBRatingForShow,
})(NetflixShowsContainerComponent);



