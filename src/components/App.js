import React, { Component } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom'
import Header from './Header'
import AlbumList from './AlbumList'
// import Footer from './Footer'
import '../styles/App.sass'

class App extends Component {

  state = {
    albums: [],
    randomAlbums: [],
  }

  //fetch data from json file which is on github server
  componentDidMount() {
    fetch('https://raw.githubusercontent.com/Morswin19/my_albums_wd/master/public/data/data.json')
      .then(response => response.json())
      .then(data => {
        this.setState({
          albums: data,
        })
      })
  }

  //function with routes
  allRoutes = () => {
    return (
      <HashRouter basename={process.env.PUBLIC_URL}>
        <div className="App">
          <Header albums={this.state.albums} handleClick={this.handleDecadeClick} />
          <section>
            <Switch>
              <Route path="/60s">
                <AlbumList albums={this.state.albums} time='1960' />
              </Route>
              <Route path='/70s'>
                <AlbumList albums={this.state.albums} time='1970' />
              </Route>
              <Route path='/80s'>
                <AlbumList albums={this.state.albums} time='1980' />
              </Route>
              <Route path='/90s'>
                <AlbumList albums={this.state.albums} time='1990' />
              </Route>
              <Route path='/00s'>
                <AlbumList albums={this.state.albums} time='2000' />
              </Route>
              <Route path='/10s'>
                <AlbumList albums={this.state.albums} time='2010' />
              </Route>
              <Route path='/today'>
                <AlbumList albums={this.state.albums} time='today' />
              </Route>
              <Route path='/' exact>
                <AlbumList albums={this.state.albums} time='all' />
              </Route>
              <Route>
                <AlbumList albums={this.state.albums} time='all' />
              </Route>
            </Switch>
          </section>
        </div >
      </HashRouter >
    )
  }

  render() {
    return (
      <>
        {this.allRoutes()}
      </>
    )
  }
}

export default App;