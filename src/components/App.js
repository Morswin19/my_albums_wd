import React, { Component } from 'react';
import AlbumList from './AlbumList'
import Navigation from './Navigation'
import '../styles/App.sass'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'

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

    return (
      <Router>
        <div className="App">
          <header>
            <h1>My Albums</h1>
            <nav>
              <ul className='naviList'>
                <li><Link to='/'>all albums</Link></li>
                <li><Link to='/60s'>60s</Link></li>
                <li><Link to='/70s'>70s</Link></li>
                <li><Link to='/80s'>80s</Link></li>
                <li><Link to='/90s'>90s</Link></li>
                <li><Link to='/00s'>00s</Link></li>
                <li><Link to='/10s'>10s</Link></li>
              </ul>
            </nav>
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
        </div>
      </Router>
    )
  }
}

export default App;

// http://localhost:3000/data/data.json