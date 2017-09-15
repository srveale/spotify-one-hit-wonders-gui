import React, { Component } from 'react';
import * as d3 from 'd3';

class FitGraph extends Component {
  	constructor (props) {
    	super(props)
  	}

  	componentDidMount() {
  		console.log('in component did mount', this.props)
  		console.log('this.props.artistData.popularites', this.props.artistData.popularities)
  		d3.select(".chart")
	        .selectAll("div")
			.data(this.props.artistData.popularities)
				.enter()
			.append("div")
				.style("width", function(d) { return d * 10 + "px"; })
				.text(function(d) { return d; });
    }

    shouldComponentUpdate(props) {
      d3.select(".chart")
        .selectAll("div")
          .data(this.props.artistData.popularities)
        .enter().append("div")
          .style("width", function(d) { return d * 10 + "px"; })
          .text(function(d) { return d; });
    }

    render() {
      return (
  			<div>
         		<div className="chart">
          		</div>
          		<div>
          		</div> 
  			</div>
  		)
  	}
}

export default FitGraph;