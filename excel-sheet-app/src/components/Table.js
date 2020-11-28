import React, {Component} from 'react';

export default class Table extends Component  {

	createTableBody(){
		const {onDataChange, data} = this.props;
		return Object.keys(data).map(function(key) {
			return <tr>
			  	{data[key].map(function(row, index) {
				    return row[index] ? 
				    	<td>
				    		<input 
				    			type='text' 
				    			name={`cell_${row}-${index}`} 
				    			value={row[index]} 
				    			onChange={onDataChange.bind(this,key,index)} />
				    	</td>	
				    	:
				    	<td>
				    		<input 
				    		type='text' 
				    		name={`cell_${row}-${index}`} 
				    		onChange={onDataChange.bind(this,key,index)} />
				    	</td> 
			    })}
			</tr>
		})	
	}

	render() {
		return <table className="table">
			<thead>
			    <tr>
			      <th></th>
			      <th></th>
			    </tr>
  			</thead>
  			<tbody>
        		{this.createTableBody()}
        	</tbody>
      	</table>
	}
}

