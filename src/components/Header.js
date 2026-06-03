import React, { useState } from 'react';

import Navigation from './Navigation';
import AlbumSlider from './AlbumSlider';

import '../styles/header.sass';
import HeaderAssets from '../imageAssets/HeaderAssets';

const Header = props => {
  const [search, setSearch] = useState('');
  const { albums } = props;

  const handleSearchChange = e => {
    let val = e.target.value;
    setSearch(val);
  };

  return (
    <div id='header'>
      <HeaderAssets />
      <div id='headerTextContainer'>
        <Navigation />
        <h1>
          My
          <br />
          music
        </h1>
        <h2>albums from my jukebox</h2>
        <form className='search info' onSubmit={e => e.preventDefault()}>
          <label htmlFor='search'>
            <input
              type='text'
              autoComplete='off'
              name='search'
              id='search'
              onChange={handleSearchChange}
              placeholder='search: eg. title, band, year'
            ></input>
          </label>
          <div id="search-icon">
            <div>
              <div></div>
            </div>
          </div>
        </form>
            <AlbumSlider albums={albums} search={search} />
      </div>
    </div>
  );
};

export default Header;
