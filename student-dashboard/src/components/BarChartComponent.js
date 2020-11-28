import React, { Component } from 'react';
import Chart from 'chart.js';

class BarChart extends Component {

	constructor(props) {
    	super(props);
    	this.canvas = React.createRef();
    	this.state = {
    		canvasMounted: false
    	}
  	}

  	componentDidMount(){
  		this.setState({
  			canvasMounted: true
  		})
  	}

	renderBarChart(){
		const { labels =[], data=[] } = this.props;
		const canvas = this.canvas.current;
		if(canvas) {
			const ctx = canvas.getContext("2d");
			var myChart = new Chart(ctx, {
			    type: 'bar',
			    data: {
		    	 	fill: false,
			        labels: labels,
			        datasets: [{
			            data: data,
			            backgroundColor: [
			                'rgba(255, 99, 132, 0.2)',
			                'rgba(54, 162, 235, 0.2)',
			                'rgba(75, 192, 192, 0.2)',
			                'rgba(255, 206, 86, 0.2)',
			            ],
			            borderColor: [
			                'rgba(255,99,132,1)',
			                'rgba(54, 162, 235, 1)',
			                'rgba(75, 192, 192, 1)',
			                'rgba(255, 206, 86, 0.2)',
			            ],
			            borderWidth: 1
			        }]
			    },
			    options: {
			    	responsive: true,
			    	legend: {
				        display: false
				    },
			        scales: {
			        	xAxes:[{
			        		position: 'top',
			        		scaleLabel: {
			        			display: true,
			        			labelString: "Subject"
			        		}
			        	}],
			            yAxes: [{
			                ticks: {
			                    beginAtZero:true
			                },
			                scaleLabel: {
			        			display: true,
			        			labelString: "Marks"
			        		}
			            }]

			        }
			    }
			});	
		}
	}

	render() {
		return <div className="chart-container" style={{
				position: 'relative',
				height:'40vh',
				width:'80vw' }}>
			<canvas ref={this.canvas} width={640} height={425} />
			{this.renderBarChart()}
		</div>
	}
}

export default BarChart;