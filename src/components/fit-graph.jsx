import React, { Component } from 'react';
import * as d3 from 'd3';

class FitGraph extends Component {
  	constructor (props) {
    	super(props)
      this.state = {
          artistName: "",
          moreToggled: false
      }

      this.toggleMore = this.toggleMore.bind(this);
  	}

  	componentDidMount() {
  		console.log('in component did mount', this.props)
  		console.log('this.props.artistData.popularites', this.props.artistData.popularities)
    }

    componentWillReceiveProps(nextProps) {
        console.log('in componentWillReceiveProps', nextProps.artistData.artistName)
        this.setState({
            artistName: nextProps.artistData.artistName,
            error: nextProps.artistData.error
        });
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('in compononentDidUpdate', this.props.artistData)
        const viewHeight = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        const viewWidth = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        const graphSVG = document.getElementById("bar-chart");
        graphSVG.setAttribute("height", viewHeight / 3.5);
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

        // X-Axis
        g.append("g")
          .attr("class", "axis axis--x")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));

        // Y-Axis
        g.append("g")
              .attr("class", "axis axis--y")
              .call(d3.axisLeft(y).ticks(10))
            .append("text")
              .attr("transform", "rotate(-90)")
              .attr("y", 6)
              .attr("dy", "0.35em")
              .attr("text-anchor", "end")
              .text("Popularity");

        // Bars
        g.selectAll(".bar")
            .data([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
            .enter()
            .append("rect")
                .attr("class", "bar")
                .attr("x", (d, i) => x(i + 1))
                .attr("y", (d, i) => y(d) )
                .attr("width", x.bandwidth())
                .attr("height", (d) => height - y(d))

        // X-Label
        g.append("text")
            .attr("x", width / 2 )
            .attr("y",  height + margin.top + 7 )
            .style("text-anchor", "middle")
            .text("Song");

        // Y-Label
        g.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left - 4)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Popularity");


        const tooltip = d3.select("body").append("div").attr("class", "toolTip");

        const processedTracks = this.props.artistData.processedTracks || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

        svg.select('g').selectAll(".bar")
            .data(processedTracks)
                .attr("class", "bar")
                .attr("x", (d, i) => x(i + 1))
                .attr("y", (d, i) => y(d.popularity) )
                .attr("width", x.bandwidth())
                .attr("height", (d) => height - y(d.popularity))
                .on("mousemove", function(d){
                  tooltip
                    .style("left", d3.event.pageX - 50 + "px")
                    .style("top", d3.event.pageY - 70 + "px")
                    .style("display", "inline-block")
                    .html(d.name);
                })
                .on("mouseout", function(d){ tooltip.style("display", "none");});

    }

    toggleMore() {
      this.setState({ moreToggled: !this.state.moreToggled })
    }

    render() {
        const error = this.state.error;
        const artistData = this.props.artistData;
        console.log('artistData', artistData);
        const artistName = this.state.artistName;
        const ohwFactor = artistData.fitParams ? Math.abs(artistData.fitParams.equation[1]) * 1000 : null;
        const equationString = artistData.fitParams ? artistData.fitParams.string : ""
        // const isOHW = this.props.artistData.isOHW;
        return (
    			<div>
           		<div className="chart">
                <svg width="960" height="600" id="bar-chart">
                </svg>
                {error && <h3> {error} </h3>}
                {artistName && ohwFactor && <h4> <strong>{artistName}</strong> has a OHW Factor of <h1>{ohwFactor}</h1> </h4>}
                {artistName && ohwFactor && <h4><a id="more-toggle" href="#more-toggle" onClick={this.toggleMore}>More Info</a></h4>}
                {this.state.moreToggled && (
                  <span>
                    <p>Obtaining data from Spotify, this app finds the popularity of an artist's top-10 tracks. </p>
                    <p>Running the data through some <a href="http.www.reddit.com">math</a>, we find out how quickly the popularity of the artist drops after their first hit. </p>
                    <p>An artist is determined to be a One-Hit-Wonder if they have <strong>at least one "hit" (a song over 50 popularity) and an OHW over 100</strong></p>
                    <p>See if you can find the biggest One-Hit-Wonder! You can also try to find the bands with the lowest OHW Factor, meaning their top-10 tracks are all around the same popularity</p>
                  </span>
                )}
            	</div>
    			</div>
  		)
  	}
}

export default FitGraph;