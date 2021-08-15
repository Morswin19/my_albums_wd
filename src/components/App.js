import React, { useState, useEffect } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Header from './Header';
import AlbumList from './AlbumList';
// import Footer from './Footer'
import '../styles/App.sass';

const App = () => {
  const [albums, setAlbums] = useState([]);
  const [recentCoverData, setRecentCoverData] = useState([]);

  // fetch data from json file which is on github server
  useEffect(() => {
    fetch(
      'https://raw.githubusercontent.com/Morswin19/my_albums_wd/master/public/data/newData15082021.json'
    )
      .then(response => response.json())
      .then(data => setAlbums(data));
  }, []);

  useEffect(() => {
    fetch(
      'https://raw.githubusercontent.com/Morswin19/my_albums_wd/master/public/data/data.json'
    )
      .then(response => response.json())
      .then(data => setRecentCoverData(data));
  }, []);

  //function with routes
  const allRoutes = () => {
    return (
      <HashRouter basename={process.env.PUBLIC_URL}>
        <div className='App'>
          <Header albums={albums} />
          <section>
            <Switch>
              <Route path='/60s'>
                <AlbumList albums={albums} time='1960' />
              </Route>
              <Route path='/70s'>
                <AlbumList albums={albums} time='1970' />
              </Route>
              <Route path='/80s'>
                <AlbumList albums={albums} time='1980' />
              </Route>
              <Route path='/90s'>
                <AlbumList albums={albums} time='1990' />
              </Route>
              <Route path='/00s'>
                <AlbumList albums={albums} time='2000' />
              </Route>
              <Route path='/10s'>
                <AlbumList albums={albums} time='2010' />
              </Route>
              <Route path='/20s'>
                <AlbumList albums={albums} time='2020' />
              </Route>
              <Route path='/today'>
                <AlbumList albums={albums} time='today' />
              </Route>
              <Route path='/' exact>
                <AlbumList albums={albums} time='all' />
              </Route>
              <Route>
                <AlbumList albums={albums} time='all' />
              </Route>
            </Switch>
          </section>
        </div>
      </HashRouter>
    );
  };

  return <>{allRoutes()}</>;
};

export default App;
