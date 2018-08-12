import React, {Component} from 'react';

export default class Table extends Component {
  
  render() {
    const { columns, rows } = this.props;
    const tableHeaders = (<thead>
          <tr>
            {columns.map(function(column) {
              return <th>{column}</th>; })}
          </tr>
      </thead>);

    const tableBody = rows.map(function(row) {
      return (
        <tr>
          {columns.map(function(column) {
            console.log(column);
            console.log(row[column]);
            return <td>{row[column]}</td>; })}
        </tr>); });
     
    // Decorate with Bootstrap CSS
    return (<table className="table table-bordered table-hover" width="100%">
        {tableHeaders}
        {tableBody}
      </table>) 
  }
}
        



