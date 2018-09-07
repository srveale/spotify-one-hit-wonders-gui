import React, { Component } from 'react';
import './App.css';
import './skeleton.css';
import FitGraph from './components/fit-graph.jsx';
import { apiURL } from './api-config.js';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            artistName: "",
            artistData: {
                popularities: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            },
            graphPresent: false
        }

        this.handleSearch = this.handleSearch.bind(this);
        this.handleYesIMeant = this.handleYesIMeant.bind(this);
    }

    handleSearch(e) {
        e.preventDefault();
        const artistName = document.getElementById("artistInput").value;
        document.getElementById('artistInput').value = ""

        fetch(`/api/data/${artistName}`)
        // fetch(`https://spotify-one-hit-wonders.herokuapp.com/api/data/${artistName}`)
            .then(res => {
                return res.json();
            })
            .then(artistData => {
                this.setState({ artistData, graphPresent: true });
            });
    }

    handleYesIMeant(e, artistId, artistName){
        e.preventDefault();
        fetch(`/api/data/artist/${artistId}/${artistName}`)
        // fetch(`https://spotify-one-hit-wonders.herokuapp.com/api/data/artist/${artistId}/${artistName}`)
            .then(res => {
                return res.json();
            })
            .then(artistData => {
                this.setState({ artistData, graphPresent: true });
            });
    }

    render() {
        return (
            <div className="App">
                {!this.state.artistData.fitParams && (
                    <div className="App-header" style={{marginTop: this.state.graphPresent ? 0 : document.documentElement.clientWidth / 5}}>
                        <h2>One-Hit-Wonder Calculator</h2>
                    </div>
                )}
                {document.documentElement.clientHeight < 900 && <hr/>}
                {!this.state.artistData.fitParams && <p> Enter a band/artist to find out if they are a one-hit-wonder </p>}
                <form onSubmit={(e) => this.handleSearch(e)}>
                    <input type="text" id="artistInput" placeholder="Artist name"></input>
                    <button type="submit"> Get Artist Data </button>
                </form>
                <FitGraph 
                    artistData={this.state.artistData} 
                    handleYesIMeant={this.handleYesIMeant}
                />
            </div>
        );
    }
}

export default App;
