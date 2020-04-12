import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import Navigation from './Navigation'
import AlbumList from './AlbumList'
import Footer from './Footer'
import '../styles/App.sass'

class App extends Component {

  state = {
    albums: []
  }

  componentDidMount() {
    fetch('https://raw.githubusercontent.com/Morswin19/my-albums-react-app/master/public/data/data.json')
      .then(response => response.json())
      .then(data => {
        this.setState({
          albums: data
        })
      })
  }

  render() {

    return (
      <Router>
        <div className="App">
          <header>
            <h1>My Albums</h1>
            <Navigation />
          </header>
          <section>
            <Route
              path='/' exact
              render={(props) => <AlbumList albums={this.state.albums} time='all' />}
            />
            <Route
              path='/60s'
              render={(props) => <AlbumList albums={this.state.albums} time='60' />}
            />
            <Route
              path='/70s'
              render={(props) => <AlbumList albums={this.state.albums} time='70' />}
            />
            <Route
              path='/80s'
              render={(props) => <AlbumList albums={this.state.albums} time='80' />}
            />
            <Route
              path='/90s'
              render={(props) => <AlbumList albums={this.state.albums} time='90' />}
            />
            <Route
              path='/00s'
              render={(props) => <AlbumList albums={this.state.albums} time='00' />}
            />
            <Route
              path='/10s'
              render={(props) => <AlbumList albums={this.state.albums} time='10' />}
            />
            <Route
              path='/today'
              render={(props) => <AlbumList albums={this.state.albums} time='today' />}
            />
          </section>
          <footer>
            <Footer />
          </footer>
        </div>
      </Router>
    )
  }
}

export default App;

// favicon
// console bugs