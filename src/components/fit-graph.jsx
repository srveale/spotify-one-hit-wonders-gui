import React, { Component } from 'react';
import * as d3 from 'd3';

class FitGraph extends Component {
  	constructor (props) {
    	super(props)
        this.state = {
            artistName: ""
        }
  	}

  	componentDidMount() {
  		console.log('in component did mount', this.props)
  		console.log('this.props.artistData.popularites', this.props.artistData.popularities)

        const viewHeight = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        const viewWidth = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        const graphSVG = document.getElementById("bar-chart");
        graphSVG.setAttribute("height", viewHeight / 3);
        graphSVG.setAttribute("width", viewWidth);

        const svg = d3.select("svg");

        const margin = {top: 20, right: 20, bottom: 30, left: 40};
        const width = svg.attr("width") - margin.left - margin.right;
        const height = svg.attr("height") - margin.top - margin.bottom;

        const x = d3.scaleBand().range([0, width]).padding(0.1)
        const y = d3.scaleLinear().range([height, 0]);
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
              .call(d3.axisLeft(y).ticks(10))
            .append("text")
              .attr("transform", "rotate(-90)")
              .attr("y", 6)
              .attr("dy", "0.35em")
              .attr("text-anchor", "end")
              .text("Popularity");

        g.selectAll(".bar")
            .data([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
                .enter()
                .append("rect")
                .attr("class", "bar")
                .attr("x", (d, i) => x(i + 1))
                .attr("y", (d, i) => y(d) )
                .attr("width", x.bandwidth())
                .attr("height", (d) => height - y(d))
    }

    componentWillReceiveProps(nextProps) {
        console.log('in componentWillReceiveProps', nextProps.artistData.artistName)
        this.setState({ artistName: nextProps.artistData.artistName });
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('in compononentDidUpdate', this.props.artistData.popularities)
        const popularities = this.props.artistData.popularities;
        const svg = d3.select("svg");

        const margin = {top: 20, right: 20, bottom: 30, left: 40};
        const width = svg.attr("width") - margin.left - margin.right;
        const height = svg.attr("height") - margin.top - margin.bottom;

        const x = d3.scaleBand().range([0, width]).padding(0.1)
        const y = d3.scaleLinear().range([height, 0]);
        x.domain([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) // put tracks here
        y.domain([0, 100])

        const g = svg.select('g')

        g.selectAll(".bar")
            .data(popularities)
                .attr("class", "bar")
                .attr("x", (d, i) => x(i + 1))
                .attr("y", (d, i) => y(d) )
                .attr("width", x.bandwidth())
                .attr("height", (d) => height - y(d))
    }

    render() {
        const artistData = this.props.artistData;
        console.log('in render function', artistData)
        const artistName = this.state.artistName;
        const ohwFactor = artistData.fitParams ? Math.abs(artistData.fitParams.equation[1]) * 1000 : null;
        return (
  			<div>
         		<div className="chart">
          		</div>
          		<svg width="960" height="600" id="bar-chart">
          		</svg>
                {artistName && <h1> Results for "<strong>{artistName}</strong>" </h1>}
                {ohwFactor && <h1> One-Hit-Wonder Factor: {ohwFactor} </h1>}
  			</div>
  		)
  	}
}

export default FitGraph;