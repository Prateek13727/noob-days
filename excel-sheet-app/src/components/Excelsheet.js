import React, {Component} from 'react';
import Table from './Table';

export default class Excelsheet extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {
				0: [{0: null},{1: null}],
				1: [{0: null},{1: null}]
			}
		}
	}

	getTotalRows() {
		const {data} = this.state;
		return Object.keys(data).length;
	}

	getTotalColumns() {
		const {data} = this.state;
		const firstCol = Object.keys(data)[0]
		if (data[firstCol]) {
			return data[firstCol].length;
		} else {
			return 0;
		}
	}

	addRow() {
		const { data } = this.state;
		const rows = this.getTotalRows();
		const cols = this.getTotalColumns();
		let i = 0;
		const newRowData = [];
		while(i<cols) {
			newRowData.push({[i]: null})
			i++;
		}
		const newData = Object.assign({}, data);
		newData[rows] = newRowData;
		this.setState({
			data: newData
		})
	}

	addColumn() {
		const { data } = this.state;
		const newData = Object.assign({}, data);
		const cols = this.getTotalColumns();
		Object.keys(newData).forEach((key) => {
			newData[key].push({[cols]: null})
		});
		this.setState({
			data: newData
		})
	}

	deleteRow() {
		const { data } = this.state;
		const rows = this.getTotalRows();
		const newData = Object.assign({}, data);
		if( rows > 0 ) {
			delete newData[rows-1] 
		}
		this.setState({
			data: newData
		})
	}

	deleteColumn() {
		const { data } = this.state;
		const newData = Object.assign({}, data);
		const cols = this.getTotalColumns();
		Object.keys(newData).forEach((key) => {
			newData[key].pop()
		});
		this.setState({
			data: newData
		})
	}

	onDataChange(rowIndex, columnIndex) {
		console.log(rowIndex, columnIndex);
	}

	render(){
		const { onDataChange, data } = this.state;
		return <div class>
			<header>
				Excelsheet
			</header>
			<main>
				<section>
					<button className="btn" onClick={this.addRow.bind(this)}>+Row</button>
					<button className="btn" onClick={this.deleteRow.bind(this)}>-Row</button>
					<button className="btn" onClick={this.addColumn.bind(this)}>+Column</button>
					<button className="btn" onClick={this.deleteColumn.bind(this)}>-Column</button>
					<button className="btn" onClick={this.deleteColumn.bind(this)}>Save</button>
				</section>
				<section className="sheet__table">
					{<Table 
				 		data={data}
				 		onDataChange= {this.onDataChange.bind(this)}
			 		/>}
				</section>
			</main>
			<footer>
			</footer>
		</div>
	}
}