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
    }

    handleSearch(e) {
        console.log('apiURL', apiURL)
        e.preventDefault()
        const artistName = document.getElementById("artistInput").value;
        console.log('getting artist', artistName)
        console.log('fromUrl', `/data/${artistName}`)

        fetch(`/api/data/${artistName}`)
            .then(res => {
                console.log('getting response', res)
                return res.json();
            })
            .then(artistData => {
                console.log('popularities', artistData);
                artistData.artistName = artistName
                this.setState({ artistData, graphPresent: true });
            });
    }

    render() {
        console.log('in app render', this.state.artistData)
        return (
            <div className="App">
                <div className="App-header" style={{marginTop: this.state.graphPresent ? 0 : document.documentElement.clientWidth / 5}}>
                    <h2>One Hit Wonders on Spotify</h2>
                </div>
                {document.documentElement.clientHeight < 900 && <hr/>}
                <p> Enter the name of a band/artist to find out if they are a one-hit-wonder </p>
                <form onSubmit={(e) => this.handleSearch(e)}>
                    <input type="text" id="artistInput" placeholder="Artist name"></input>
                    <button type="submit"> Get Artist Data </button>
                </form>
                <FitGraph artistData={this.state.artistData}/>
            </div>
        );
    }
}

export default App;
