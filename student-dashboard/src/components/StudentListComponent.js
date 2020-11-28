import React, {Component} from 'react';
import { connect } from 'react-redux';
import { isEmpty, cloneObject } from '../utilities/commonUtilities';
import backgroundImg from '../images/bg-image.jpg';
import CardComponent from './StudentCardComponent';
import InputSearch from './InputSearchComponent';
import Button from './ButtonComponent';

import { getStudents, 
	searchStudentsByName,
	initializeStudentIds,
	sortStudentsByName,
	sortStudentsByMarks } from '../actions/index';

class StudentListComponent extends Component {
	
	constructor(props) {
		console.log("constructor ....")
		super(props);
		this.state = {
			nameSort: false,
			marksSort: false,
			isLoading: true
		}
	}

	componentDidMount(){
		console.log("InComponentDidMount ....")
		const { getStudents } = this.props;
		getStudents();	
	}

	componentDidUpdate(prevProps, prevState) {
		console.log("InComponentDidUpdate ....")
		const { students, studentIds, initializeStudentIds } = this.props;
		if(prevProps.students !== students && studentIds.length === 0) {
			initializeStudentIds(students);
			this.setState({
				isLoading: false
			})
		}
	}

  	componetShouldUpdate(){
  		console.log("InComponentShouldUpdate ....")
  	}

	getDisplayedStudents(){
		const { students, studentIds } = this.props;
		const displayedStudents = cloneObject(students);
		Object.keys(students).forEach((key) => {
			if(studentIds.indexOf(key) === -1){
				delete displayedStudents[key]
			}
		})
		return displayedStudents;
	}

	renderStudents(){
		const { students, studentIds } = this.props;
		return studentIds.map((studentId) => {
			const student = students[studentId];
			return <div key={studentId} className="col-1-of-4 students__card">
				<CardComponent 
					student={student}
					studentId={studentId}
				/>
			</div>
		});
	}

	renderLoader(){
		return <div className="students__loader">
			Loading ...
		</div>
	}

	render() {
		const { students, studentIds } = this.props;
		const { isLoading } =this.state;
		console.log("In render");
		return <div className="students">
			<section className="students__background">
				<img src={backgroundImg} alt={name} className="students__background-img"/>
			</section>
			<header className="students__header">
				<div className="students__inputSearch">
					<InputSearch
						placeholder="Search By Name ..."
						disabled={isLoading}		
						type="text"
						onChange={(event) => {
							const {searchStudentsByName, students } = this.props;
							const inputString = event.target.value;
							searchStudentsByName(students, 
								inputString);	
						}}
					/>
				</div>
				<div className="students__sortbyName-btn">
					<Button text="Sort By Names" 
							className="btn"
							disabled={isLoading}
							onClick={() => {
								this.setState((prevState) => ({
									nameSort: !prevState.nameSort
								}), () => {
									const { sortStudentsByName} = this.props;
									const { nameSort } = this.state;
									sortStudentsByName(this.getDisplayedStudents(), 
										nameSort);	
								})	
							}}/>
				</div>
				<div className="students__sortbyMark-btn">
					<Button text="Sort By Marks" 
						className="btn" 
						disabled={isLoading}
						onClick={() => {
							this.setState((prevState) => ({
								marksSort: !prevState.marksSort
							}), () => {
								const { sortStudentsByMarks, students } = this.props;
								const { marksSort } = this.state;
								sortStudentsByMarks(this.getDisplayedStudents(), 
									marksSort);	
							})
								
						}}/>
				</div>
			</header>
			<main>
				<div className="row students__row">
					{
						isLoading &&
							 this.renderLoader()
						||
							 this.renderStudents()
					}
				</div>
			</main>
		</div>
	}
}

function mapStateToProps({
	students, 
	studentIds
}) {
	return {
		students,
		studentIds
	}
}

export default connect(mapStateToProps, { 
	getStudents,
	searchStudentsByName,
	initializeStudentIds,
	sortStudentsByName,
	sortStudentsByMarks
})(StudentListComponent);



