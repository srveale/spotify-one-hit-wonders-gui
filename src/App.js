import React, { Component } from 'react';
import './App.css';
import FitGraph from './components/fit-graph.jsx'

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            artistData: {
                popularities: [43, 42, 41, 40],
            }
        }

        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(artistName) {
        console.log('getting artist', artistName)
        fetch(`/data/${artistName}`)
            .then(res => {
                console.log('getting response')
                return res.json();
            })
            .then(artistData => {
                console.log('popularities', artistData);
                this.setState({ artistData });
            });
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h2>Spotify Artist Track Popularity</h2>
                </div>
                <form onSubmit={this.handleSearch}>
                    <input type="text">
                    </input>
                    <button type="submit"> Get Artist Data </button>
                </form>
                <FitGraph handleSearch={this.handleSearch} artistData={this.state.artistData}/>
            </div>
        );
    }
}

export default App;
