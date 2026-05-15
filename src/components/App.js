import React, { useState, useEffect } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Header from './Header';
import AlbumList from './AlbumList';
// import Footer from './Footer'
import '../styles/App.sass';
import { fetchDiscogsCollection } from '../services/discogsService';

const App = () => {
  const [albums, setAlbums] = useState([]);

  // fetch collection data from Discogs API
  useEffect(() => {
    const getAlbums = async () => {
      const collection = await fetchDiscogsCollection();
      setAlbums(collection);
    };
    getAlbums();
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
