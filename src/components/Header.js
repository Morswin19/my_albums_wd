import React, { useState } from 'react';

import Navigation from './Navigation';
import AlbumSliderItem from './AlbumSliderItem';

import '../styles/header.sass';
import HeaderAssets from '../imageAssets/HeaderAssets';

const Header = props => {
  const [sliderShift, setSliderShift] = useState(0);
  // const [albums, setAlbums] = useState([props]);
  const [search, setSearch] = useState('');
  const [random] = useState(Math.floor(Math.random() * 270));

  const handleSearchChange = e => {
    let val = e.target.value;
    setSearch(val);
    setSliderShift(0);
  };

  const handleSliderArrowClick = e => {
    const sliderItems = parseInt(e.target.parentElement.className);

    e.target.innerText === '<'
      ? sliderShift < 0 && setSliderShift(sliderShift + 285)
      : sliderShift >
          -(285 * (sliderItems - (window.innerWidth > 650 ? 2 : 1))) &&
        setSliderShift(sliderShift - 285);
  };

  let Album = [];
  let amount;
  const { albums } = props;
  if (search !== '') {
    Album = albums
      .filter(
        album =>
          album.artist.toLowerCase().includes(search.toLowerCase()) ||
          album.title.toLowerCase().includes(search.toLowerCase()) ||
          album.year.toLowerCase().includes(search.toLowerCase())
      )
      .map(album => (
        <AlbumSliderItem
          key={albums.indexOf(album)}
          artist={album.artist}
          title={album.title}
          year={album.year}
          cover={album.photoLinkBig ? album.photoLinkBig : album.photoLinkSmall}
          rymLink={album.rymLink}
        />
      ));
    amount = Album.length;
  } else {
    Album = albums
      .filter((album, index) => index >= random && index < random + 20)
      .map(album => (
        <AlbumSliderItem
          key={albums.indexOf(album)}
          artist={album.artist}
          title={album.title}
          year={album.year}
          cover={album.photoLinkBig ? album.photoLinkBig : album.photoLinkSmall}
          rymLink={album.rymLink}
        />
      ));
    amount = Album.length;
  }
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
        <form className='search info'>
          <input
            type='text'
            autoComplete='off'
            name='search'
            onChange={handleSearchChange}
            placeholder='search: eg. title, band, year'
          ></input>
          <div>
            <div>
              <div></div>
            </div>
          </div>
        </form>
        <div id='albumSliderContainer'>
          <div id='albumSliderItemsContainer'>
            <div id='albumSliderItems'>
              <div
                id='items'
                style={{
                  transform: `translateX(${sliderShift}px)`
                }}
              >
                {Album}
              </div>
            </div>
          </div>
          <div className={amount} id='sliderArrows'>
            <span
              className='sliderArrow'
              onClick={e => handleSliderArrowClick(e)}
            >
              {'<'}
            </span>
            <span
              className='sliderArrow'
              onClick={e => handleSliderArrowClick(e)}
            >
              {'>'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
