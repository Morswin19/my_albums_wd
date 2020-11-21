import React, { useState, useEffect } from 'react';

import Album from './Album';
import DecadeSlider from './DecadeSlider';
import RandomSection from './RandomSection';
import AlbumListAssets from '../imageAssets/AlbumListAssets';

import '../styles/AlbumList.sass';

export const AlbumList = ({ albums, time }) => {
  const [albumsSite, setAlbumsSite] = useState(1);
  const [randomAlbum, setRandomAlbum] = useState(134);

  //variables
  let album = []; //list of albums to show
  let filteredAlbumList = []; //amount of albums to show
  let albumSiteList = []; //array of pagination <li>

  //array of decades for DecadeSlider component
  const timeLine = ['60s', '70s', '80s', 'show all', '90s', '00s', '10s'];

  ////functions
  //function for choose random album to listen
  const handleRandomButtonClick = () => {
    setRandomAlbum(Math.floor(Math.random() * albums.length));
    window.scrollTo(window.scrollX, 920);
  };

  //function to change site of pagination
  const handlePaginationClick = e => {
    window.scrollTo(window.scrollX, 920);
    setAlbumsSite(parseInt(e.target.innerHTML));
  };

  //function after arrow click in pagination, next site or earlier site
  const handlePaginationArrowClick = a => {
    if (albumsSite > 1 && a === -1) {
      setAlbumsSite(albumsSite + a);
      window.scrollTo(window.scrollX, 920);
    } else if (albumsSite < albumSiteList.length && a === 1) {
      setAlbumsSite(albumsSite + a);
      window.scrollTo(window.scrollX, 920);
    }
  };

  //function for go to first site of albums list
  const resetPagination = () => {
    setAlbumsSite(1);
  };

  //if statement to choose albums to show based on time prop
  if (time === 'all') {
    album = [...albums]
      //filter for each site in the pagination
      .filter(
        (album, index) =>
          index >= albumsSite * 25 - 25 && index < albumsSite * 25
      );
    filteredAlbumList = albums.length;
  } else if (time === 'today') {
    album = [...albums].filter((album, index) => index === randomAlbum);
    filteredAlbumList = 1;
  } else {
    album = albums
      //filter for decade to show
      .filter(album => album.year >= time && album.year < parseInt(time) + 10)
      //filter for each site in the pagination
      .filter(
        (album, index) =>
          index >= albumsSite * 25 - 25 && index < albumsSite * 25
      );
    filteredAlbumList = albums.filter(
      album => album.year >= time && album.year < parseInt(time) + 10
    ).length;
  }

  album = album.map((album, index) => (
    <Album
      key={index}
      artist={album.artist}
      title={album.title}
      year={album.year}
      cover={album.photoLinkSmall}
      rymLink={album.rymLink}
    />
  ));

  const albumsSiteListAmount = Math.ceil(filteredAlbumList / 25);

  for (let i = 1; i <= albumsSiteListAmount; i++) {
    albumSiteList.push(i);
  }
  albumSiteList = albumSiteList.map(item => (
    <li
      key={item}
      className={item === albumsSite ? 'active' : ''}
      onClick={handlePaginationClick}
    >
      {item}
    </li>
  ));

  useEffect(() => {
    resetPagination();
  }, [time]);

  return (
    <div>
      <DecadeSlider timeArray={timeLine} />
      <div id='albumList' className='albumList'>
        {album}
        <AlbumListAssets />
      </div>
      <div id='albumSites'>
        <span onClick={() => handlePaginationArrowClick(-1)}>{'<'}</span>
        <ul>{albumSiteList}</ul>
        <span onClick={() => handlePaginationArrowClick(1)}>{'>'}</span>
      </div>
      <RandomSection btnClickFunc={handleRandomButtonClick} />
    </div>
  );
};

export default AlbumList;
