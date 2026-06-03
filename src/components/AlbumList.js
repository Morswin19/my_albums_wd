import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Album from './Album';
import DecadeSlider from './DecadeSlider';
import RandomSection from './RandomSection';

import '../styles/AlbumList.sass';

export const AlbumList = ({ albums, time }) => {
  const [albumsSite, setAlbumsSite] = useState(1);
  const [randomAlbum, setRandomAlbum] = useState(134);
  const location = useLocation();

  //variables
  let album = []; //list of albums to show
  let filteredAlbumList = []; //amount of albums to show
  let albumSiteList = []; //array of pagination
  let visibleAlbumSiteList = []; //array of visible pagination <li>

  //array of decades for DecadeSlider component
  const timeLine = ['60s', '70s', '80s', 'show all', '90s', '00s', '10s', '20s'];

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
    drawPagination()
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
    drawPagination();
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
          index >= albumsSite * 20 - 20 && index < albumsSite * 20
      );
    filteredAlbumList = albums.length;
  } else if (time === 'today') {
    album = [...albums].filter((album, index) => index === randomAlbum);
    filteredAlbumList = 1;
  } else if (time === 'album') {
    const pathParts = location.pathname.split('/');
    const albumId = pathParts[pathParts.length - 1];
    album = [...albums].filter(
      (a, index) => (a.id && a.id.toString() === albumId) || index.toString() === albumId
    );
    filteredAlbumList = 1;
  } else {
    album = albums
      //filter for decade to show
      .filter(album => album.year >= time && album.year < parseInt(time) + 10)
      //filter for each site in the pagination
      .filter(
        (album, index) =>
          index >= albumsSite * 20 - 20 && index < albumsSite * 20
      );
    filteredAlbumList = albums.filter(
      album => album.year >= time && album.year < parseInt(time) + 10
    ).length;
  }

  album = album.map((album, index) => (
    <Album
      key={album.id || index}
      id={album.id}
      artist={album.artist}
      title={album.title}
      year={album.year}
      cover={album.photoLinkSmall}
      rymLink={album.rymLink}
      autoOpen={time === 'today' || time === 'album'}
    />
  ));

  const albumsSiteListAmount = Math.ceil(filteredAlbumList / 20);

  const drawPagination = () => {
    for (let i = 1; i <= albumsSiteListAmount; i++) {
      albumSiteList.push(i);
    }

    visibleAlbumSiteList = albumSiteList
      .filter(item => (item > albumsSite - 4) && (item < albumsSite + 4))
      .map(item => (
        <li
          key={item}
          className={item === albumsSite ? 'active' : ''}
          onClick={handlePaginationClick}
        >
          {item}
        </li>
      ));
    }

  drawPagination();

  useEffect(() => {
    resetPagination();
  }, [time]);

  return (
    <div>
      <DecadeSlider timeArray={timeLine} />
      <div id='albumList' className='albumList'>
        {album}
      </div>
      <div id='albumSites'>
        <span onClick={() => handlePaginationArrowClick(-1)}>{'<'}</span>
        <ul>{visibleAlbumSiteList}</ul>
        <span onClick={() => handlePaginationArrowClick(1)}>{'>'}</span>
      </div>
      <RandomSection btnClickFunc={handleRandomButtonClick} />
    </div>
  );
};

export default AlbumList;
