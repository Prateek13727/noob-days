import React, { Component } from 'react';

const StudentCardComponent = (props) => {
	const { studentId, student } = props;
	const { name, class:standard, rollNo, marks ={} } = student;
    const { s1=0, s2=0, s3=0, s4=0 } = marks;
    const totalMarks = s1+s2+s3+s4;
    const onSelectStudentCallback = onSelectStudent.bind(this);
    
    function onSelectStudent(){
        window.open(`/student/${studentId}`, "_parent") 
    }

	return <div onClick={onSelectStudentCallback}  
                    className="card">       
        <div className="card__face">
            <div className="card__details">
                <div className="card__details-name">
                    {name}
                </div>
                <hr className="card__hr"/>
                <div>
                    <label className="card__details-standard-label">Class:</label>
                    <span className="card__details-standard">{standard}</span>
                </div>
                <div>
                    <label className="card__details-rollNo-label">Roll No:</label>
                    <span className="card__details-rollNo">{rollNo}</span>
                </div> 
                <div>
                    <label className="card__details-totalMarks-label">Total Marks:</label>
                    <span className="card__details-totalMarks">{totalMarks}</span>
                </div>    
            </div>   
        </div>
	</div>
}

export default StudentCardComponent;


