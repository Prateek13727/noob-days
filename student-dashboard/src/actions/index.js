import axios from 'axios';

export const STUDENTS = "students";
export const STUDENT_IDS = "studentIds";

const STUDENT_DATA_URL = "https://api.myjson.com/bins/1dlper";

export function getStudents() {
	const students = axios.get(STUDENT_DATA_URL);
	return {
		type: STUDENTS,
		payload: students
	}
}

export function initializeStudentIds(students){
	const studentIds = getIdsFromStudents(students);	
	return {
		type: STUDENT_IDS,
		payload: studentIds
	}
}

export function searchStudentsByName(students, inputStr){
	const studentIds = getSearchResults(students, inputStr);
	return {
		type: STUDENT_IDS,
		payload: studentIds
	}
}

export function sortStudentsByName(students, toggleState){
	const studentIds = toggleState ?
							getSortByNameResults(students) : getIdsFromStudents(students);
	return {
		type: STUDENT_IDS,
		payload: studentIds
	}
}

export function sortStudentsByMarks(students, toggleState){
	const studentIds = toggleState ?
							getSortByMarksResults(students) : getIdsFromStudents(students);
	return {
		type: STUDENT_IDS,
		payload: studentIds
	}
}

function getIdsFromStudents(students){
	return Object.keys(students);
}

function getSearchResults(students, searchStr){
	return Object.keys(students).filter((id) => {
		const name = students[id].name.toLowerCase();
		return name.indexOf(searchStr.toLowerCase()) !== -1 
	})
}

function getSortByNameResults(students){
	const tempArray = Object.keys(students).map((key) => {
		const name = students[key].name;
		return {
			key, 
			name
		}
	});

	tempArray.sort((a, b) => {
		return a.name > b.name ? 1 : -1;
	});

	const ids =  tempArray.map(student => student.key);
	return ids;
}

function getSortByMarksResults(students){
	const tempArray = Object.keys(students).map((key) => {
		const { s1=0, s2=0, s3=0, s4=0 } = students[key].marks;
		const totalMarks = s1+s2+s3+s4;
		return {
			key, 
			totalMarks
		}
	});

	tempArray.sort((a, b) => {
		return b.totalMarks - a.totalMarks;
	});

	return tempArray.map(student => student.key)
}