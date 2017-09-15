import React, { Component } from 'react';

class FitGraph extends Component {
  	constructor (props) {
    	super(props)
    	this.state={
    		graphData: []
    	}
  	}

  	componentDidMount() {
  		console.log('in component did mount')
  		fetch('/data/artist')
  			.then(res => {
  				console.log('getting response')
  				return res.json();
  			})
  			.then(graphData => {
  				console.log('graphData', graphData);
  				this.setState({ graphData });
  			});
  	}

  	render() {
  		return (
  			<div>
  				<p>Yeah you got here fool </p>
  				{this.state.graphData.map(data =>
  					<div key={data.id}>{data.username}</div>
  				)}
  			</div>
  		)
  	}
}

export default FitGraph;