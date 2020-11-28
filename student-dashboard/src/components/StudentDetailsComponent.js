import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from '../utilities/commonUtilities';
import { getStudents } from '../actions/index';
import BarChart from './BarChartComponent';
import InputGroup from './InputGroupComponent';

class StudentDetailsComponent extends Component {
	constructor(props){
		super(props);
		this.state = {
			selectedStudent: {}
		}
	}

	componentDidMount(){
		const { getStudents } = this.props;
		getStudents();
	}

	componentDidUpdate(prevProps){
		const { match:{params:{id =""}}, students } = this.props;
		if(prevProps.students !== students) {
			this.setState({
				selectedStudent: students[id] ? students[id] : { name: undefined }
			})
		}
	}

	showErrorMessage(){
		return <div className="student__details-error">
			Student Id is Invalid
		</div>
	}

	renderLoader(){
		return <div className="students__loader">
			Loading ...
		</div>
	}

	renderMarks(){
		const { selectedStudent:{marks = {}} = {} } = this.state;
		return Object.keys(marks).map((key, index) => {
			return <InputGroup 
						key={key}
						id={index} 
						label={key}
						value={marks[key]}
						readOnly /> 
		})
	}

	render() {
		const { selectedStudent } = this.state;
		const {name, class:standard, rollNo, marks = {}} = selectedStudent;
		const { s1=0, s2=0, s3=0, s4=0 } = marks;
    	const totalMarks = s1+s2+s3+s4;
		return <div 
			className="student__details">
			<header className="student__details-header">
				<div onClick={() => {
					   window.open('/', "_parent") 
					}} 
					className="tooltip student__details-back">   	
	            	<i className="student__details-back-arrow fa fa-angle-left"></i>
	            	<span className="tooltiptext">Back to Home</span>
	        	</div>	
			</header>
			{
				isEmpty(selectedStudent) &&
					this.renderLoader()
				||
					selectedStudent.name && selectedStudent.name === undefined &&
						this.showErrorMessage()
					||			
						<main className="student__details-main">
							<section className="student__details-data">
								<div className="row">
									<div className="col-1-of-2 student__details-left">
										<h3 className="student__details-title">
											{name}
										</h3>
										<InputGroup 
											id="class" 
											label="Class"
											value={standard}
											readOnly />
										<InputGroup 
											id="rollNo" 
											label="Roll No"
											value={rollNo}
											readOnly />
										<div className="student__details-totalMarks">
											<InputGroup 
												id="totalMarks" 
												label="Total"
												value={totalMarks}
												readOnly /> 
										</div>
									</div>
									
									<div className="col-1-of-2 student__details-right">
										<h3 className="student__details-marks-header">
											Marks Breakup
										</h3>
										{this.renderMarks()}
										<InputGroup 
											id="totalMarks" 
											label="Total"
											value={totalMarks}
											readOnly />								
									</div>
								</div>
							</section>
							<section className="student__details-barChart">
								<BarChart 
									labels={Object.keys(marks)} 
									data={Object.values(marks)} />
							</section>
						</main>
			}					
		</div>	
	}
}

function mapStateToProps({
	students
}) {
	return {
		students
	}
}

export default connect(mapStateToProps, {getStudents})(StudentDetailsComponent);
