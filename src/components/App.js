import React, { Component } from 'react';
import './App.css';
import Album from './Album'
// import Tag from './Tags'
import { BrowserRouter as Router } from 'react-router-dom'

class App extends Component {

  state = {
    albums: []
  }

  componentDidMount() {
    fetch('http://localhost:3000/data/data.json')
      .then(response => response.json())
      .then(data => {
        this.setState({
          albums: data
        })
      })
  }

  render() {
    const album = this.state.albums.map(album => (
      <Album key={this.state.albums.indexOf(album)} artist={album.artist} title={album.title} year={album.year} />
    ))
    return (
      <Router>
        <div className="App" >
          <header>
            <Navigation />
          </header>
          {album}
        </div>
      </Router>
    );
  }
}

export default App;

// http://localhost:3000/data/data.json