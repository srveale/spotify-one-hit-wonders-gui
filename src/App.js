import React, { Component } from 'react';
import './App.css';
import FitGraph from './components/fit-graph.jsx'

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            artistName: "",
            artistData: {
                popularities: [],
            }
        }

        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(e) {
        e.preventDefault()
        const artistName = document.getElementById("artistInput").value;
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
        console.log('in app render', this.state.artistData)
        return (
            <div className="App">
                <div className="App-header">
                    <h2>Spotify Artist Track Popularity</h2>
                </div>
                {this.state.artistName && <h5> Showing top tracks for {this.state.artistName}</h5>}
                <form onSubmit={(e) => this.handleSearch(e)}>
                    <input type="text" id="artistInput">
                    </input>
                    <button type="submit"> Get Artist Data </button>
                </form>
                <FitGraph handleSearch={this.handleSearch} artistData={this.state.artistData}/>
            </div>
        );
    }
}

export default App;
