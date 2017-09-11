import React, { Component } from 'react';
import './App.css';
import FitGraph from './components/fit-graph.jsx'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>One-hit-wonders based on Spotify track popularity</h2>
        </div>
        <FitGraph />
      </div>
    );
  }
}

export default App;
