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
				.style("width", function(d) { return d + "%" })
				.text(function(d) { return d; });
    }

    componentDidUpdate(prevProps, prevState) {
    	const chart = d3.select(".chart")
    		.selectAll("div")
    	    .data(this.props.artistData.popularities)

    	chart.enter()
    		.append('div')
    		.merge(chart)
    		.transition()
    		.duration('2000')
    		.style("width", function(d) { return d + "%" })
    	    .text(function(d) { return d; });


        const svg = d3.select("svg");

        const popularities = this.props.artistData.popularities;
        const margin = {top: 20, right: 20, bottom: 30, left: 40};
        const width = svg.attr("width") - margin.left - margin.right;
        const height = svg.attr("height") - margin.top - margin.bottom;

        const x = d3.scaleBand().rangeRound([0, width]).padding(0.1)
        const y = d3.scaleLinear().rangeRound([height, 0]);
        x.domain([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) // put tracks here
        y.domain([0, 100])

        const g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

        g.append("g")
          .attr("class", "axis axis--x")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));

        g.append("g")
              .attr("class", "axis axis--y")
              .call(d3.axisLeft(y).ticks(10, ""))
            .append("text")
              .attr("transform", "rotate(-90)")
              .attr("y", 6)
              .attr("dy", "0.35em")
              .attr("text-anchor", "end")
              .text("Popularity");

        g.selectAll(".bar")
            .data(this.props.artistData.popularities)
            .enter().append("rect")
                .attr("class", "bar")
                .attr("x", (d, i) => x(i + 1))
                .attr("y", (d, i) => y(d) )
                .attr("width", x.bandwidth())
                .attr("height", (d) => height - y(d));
    }

    render() {
      return (
  			<div>
         		<div className="chart">
          		</div>
          		<svg width="960" height="600">
          		</svg> 
  			</div>
  		)
  	}
}

export default FitGraph;