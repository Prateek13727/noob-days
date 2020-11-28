import React, {Component} from 'react';
import Table from '../components/Table';
import {cloneObject} from '../utilities/commonUtilities'

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
		const n_rows = this.getTotalRows();
		if (n_rows) {
			return data[0].length;
		} else {
			return 0;
		}
	}

	addRow() {
		const { data } = this.state;
		const n_rows = this.getTotalRows();
		const n_cols = this.getTotalColumns();
		let i = 0;
		const newRowData = [];
		while(i<n_cols) {
			newRowData.push({[i]: null})
			i++;
		}
		const newData = cloneObject(data);
		newData[n_rows] = newRowData;
		this.setState({
			data: newData
		})
	}

	addColumn() {
		const { data } = this.state;
		const newData = cloneObject(data);
		const n_cols = this.getTotalColumns();
		Object.keys(newData).forEach((key) => {
			newData[key].push({[n_cols]: null})
		});
		this.setState({
			data: newData
		});
	}

	deleteRow() {
		const { data } = this.state;
		const n_rows = this.getTotalRows();
		const newData = cloneObject(data);
		if( n_rows > 0 ) {
			delete newData[n_rows-1] 
		}
		this.setState({
			data: newData
		});
	}

	deleteColumn() {
		const { data } = this.state;
		const newData = cloneObject(data);
		const cols = this.getTotalColumns();
		Object.keys(newData).forEach((key) => {
			newData[key].pop()
		});
		this.setState({
			data: newData
		})
	}

	onDataChange(rowIndex, columnIndex) {
		
	}

	render(){
		const { onDataChange, data } = this.state;
		return <div className=".container">
			<header>
				Excel-Sheet
			</header>
			<main>
				<div className="row">
					<div className="col-1-of-2">
						<section className="sheet__table">
							{<Table 
						 		data={data}
						 		onDataChange= {this.onDataChange.bind(this)}
					 		/>}
						</section>	
					</div>
					<div className="col-1-of-2">
						<section className="sheet__operations">
							<button className="btn" onClick={this.addRow.bind(this)}>+Row</button>
							<button className="btn" onClick={this.deleteRow.bind(this)}>-Row</button>
							<button className="btn" onClick={this.addColumn.bind(this)}>+Column</button>
							<button className="btn" onClick={this.deleteColumn.bind(this)}>-Column</button>
							<button className="btn" onClick={this.deleteColumn.bind(this)}>Save</button>
						</section>
					</div>
				</div>
			</main>
			<footer>
			</footer>
		</div>
	}
}