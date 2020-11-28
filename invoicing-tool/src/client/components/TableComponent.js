import React, {Component} from 'react';
import { Table } from 'react-bootstrap';

const ReactTable = (props) => {
    const { columns, rows } = props;

    const tableHeaders = (<thead>
          <tr>
            {columns.map(function(column, i) {
              return <th key={i}>{column}</th>; })}
          </tr>
      </thead>);

    const tableBody = rows.map(function(row, i) {
      return (
        <tr key={i}>
          {columns.map(function(column, j) {
            return <td key={i + j}>{row[column]}</td>; })}
        </tr>); });

    return <Table bordered condensed hover responsive>
        {tableHeaders}
      <tbody>
    	 {tableBody}
      </tbody>
    </Table>
  }
        
export default ReactTable;


