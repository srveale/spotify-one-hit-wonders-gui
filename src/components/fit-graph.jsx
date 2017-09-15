import React, { Component } from 'react';
import * as d3 from 'd3';

class FitGraph extends Component {
  	constructor (props) {
    	super(props)
    	this.state={
    		graphData: [75, 70, 64, 60, 56, 52, 51, 50, 50, 50]
    	}
  	}

  	componentDidMount() {
  		console.log('in component did mount', this.state.graphData)
      d3.select(".chart")
        .selectAll("div")
          .data(this.state.graphData)
        .enter().append("div")
          .style("width", function(d) { return d * 10 + "px"; })
          .text(function(d) { return d; });
  		// fetch('/data/artist')
  		// 	.then(res => {
  		// 		console.log('getting response')
  		// 		return res.json();
  		// 	})
  		// 	.then(graphData => {
  		// 		console.log('graphData', graphData);
  		// 		this.setState({ graphData });
  		// 	});
  	}
    shouldComponentUpdate(props) {
      const chart = d3.select(".chart")
      d3.select(".chart")
        .selectAll("div")
          .data(this.state.graphData)
        .enter().append("div")
          .style("width", function(d) { return d * 10 + "px"; })
          .text(function(d) { return d; });
      return false
    }

  	render() {
  		return (
  			<div>
          <div className="chart">
          </div>

  			</div>
  		)
  	}
}

export default FitGraph;