import React, { Component } from 'react';
import * as d3 from 'd3';
import * as _ from 'lodash';

class FitGraph extends Component {
  	constructor (props) {
    	super(props)
      this.state = {
          artistName: "",
          moreToggled: false,
          firstRender: true,
      }

      this.toggleMore = this.toggleMore.bind(this);
  	}

    componentWillReceiveProps(nextProps) {
        this.setState({
            artistName: nextProps.artistData.artistName,
            error: nextProps.artistData.error,
            firstRender: true,
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.firstRender) {
          const viewWidth = document.documentElement.clientWidth < 750 ? document.documentElement.clientWidth : window.innerWidth;
          const viewHeight = Math.min(document.documentElement.clientHeight, window.innerHeight || 0);

          const graphSVG = document.getElementById("bar-chart");
          graphSVG.setAttribute("height", Math.max(viewHeight / 3, 375));
          graphSVG.setAttribute("width", Math.max(viewWidth / 2, 365));

          const svg = d3.select("svg")

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
          // Put in dummy data if not enough tracks
          for (let i = 0; i < 10; i++) {
            processedTracks[i] = processedTracks[i] ? processedTracks[i] : {popularity: 1, name: "N/A"};
            processedTracks[i].name = processedTracks[i].name ? processedTracks[i].name : "Track name not found";
          }


          svg.select('g').selectAll(".bar")
              .data(processedTracks)
                  .transition()
                  .duration(1000)
                  .attr("class", "bar")
                  .attr("x", (d, i) => x(i + 1))
                  .attr("y", (d, i) => y(d.popularity) )
                  .attr("width", x.bandwidth())
                  .attr("height", (d) => height - y(d.popularity))

          svg.select('g').selectAll(".bar")
              .on("mousemove", function(d){
                tooltip
                  .style("left", d3.event.pageX - 50 + "px")
                  .style("top", d3.event.pageY - 70 + "px")
                  .style("display", "inline-block")
                  .html(d.name);
              })
              .on("mouseout", function(d){ tooltip.style("display", "none");});
        }
    }

    toggleMore() {
      this.setState({ moreToggled: !this.state.moreToggled, firstRender: false })
    }

    render() {
        let error = this.state.error;
        const { artistData } = this.props;
        console.log("artistData", artistData);
        const { artistName } = artistData;
        if (artistName && _.get(artistData, 'fitParams.equation[1]', null) === null) error = "Corrupt data found for this artist, please try again later"
        console.log("artistName", artistName);
        const ohwFactor = artistData.fitParams ? Math.abs(artistData.fitParams.equation[1]) * 1000 : null;
        const ohwString = _.get(artistData, 'isOHW.ohwString');
        return (
    			<div>
           		<div className="chart">
                {error && <h3> {error} </h3>}
                {!error && artistName && ohwFactor && <h4> OHW Factor for <strong>{artistName} </strong> <span id="ohwFactor"><h1><strong>{ohwFactor}</strong></h1> <h3 id="ohwString">({ohwString})</h3></span> </h4>}
                <br/>
                {!error && artistName && ohwFactor && <span><h4 id="chartTitle"> Track popularities for {artistName} </h4>
                <p>(hover/tap to view track name)</p></span>}
                <svg width="960" height="600" id="bar-chart"></svg>
                {!error && artistName && ohwFactor && <h4><a id="more-toggle" href="#more-toggle" onClick={this.toggleMore}>{this.state.moreToggled ? "Less Info" : "More Info"}</a></h4>}
                {this.state.moreToggled && (
                  <span>
                    <p>Obtaining data from <a href="https://developer.spotify.com/web-api/">Spotify</a>, this app finds the popularity of an artist's top-10 tracks. </p>
                    <p>Running the data through some <a href="https://www.reddit.com/r/dataisbeautiful/comments/75p6jq/quantify_the_degree_of_onehitwonderness_of_any/">math</a>, we find out how quickly the popularity of the artist drops after their first hit. </p>
                    <p>An artist is determined to be a One-Hit-Wonder if they have <strong>at least one "hit"</strong> (a song over 50 popularity) and an <strong>OHW over 100</strong></p>
                    <p>See if you can find the biggest One-Hit-Wonder! You can also try to find the bands with the lowest OHW Factor, meaning their top-10 tracks are all around the same popularity</p>
                  </span>
                )}
            	</div>
    			</div>
  		)
  	}
}

export default FitGraph;