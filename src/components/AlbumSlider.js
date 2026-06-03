import React, { useState, useEffect, useMemo } from 'react';
import AlbumSliderItem from './AlbumSliderItem';

const AlbumSlider = ({ albums, search }) => {
  const [sliderShift, setSliderShift] = useState(0);

  // Reset slider position when a new search starts
  useEffect(() => {
    setSliderShift(0);
  }, [search]);

  const random = useMemo(() => {
    if (!albums || albums.length === 0) return 0;
    const maxStartIndex = Math.max(0, albums.length - 20);
    return Math.floor(Math.random() * (maxStartIndex + 1));
  }, [albums]);

  const handleSliderArrowClick = e => {
    const sliderItems = parseInt(e.target.parentElement.className);

    e.target.innerText === '<'
      ? sliderShift < 0 && setSliderShift(sliderShift + 285)
      : sliderShift >
          -(285 * (sliderItems - (window.innerWidth > 650 ? 2 : 1))) &&
        setSliderShift(sliderShift - 285);
  };

  let albumsArray = [];
  let amount;
  
  if (search) {
    albumsArray = albums
      .filter(
        album =>
          album.artist.toLowerCase().includes(search.toLowerCase()) ||
          album.title.toLowerCase().includes(search.toLowerCase()) ||
          album.year.toLowerCase().includes(search.toLowerCase())
      )
      .map(album => (
        <AlbumSliderItem
          key={album.id || albums.indexOf(album)}
          artist={album.artist}
          title={album.title}
          year={album.year}
          cover={album.photoLinkBig ? album.photoLinkBig : album.photoLinkSmall}
          rymLink={album.rymLink}
        />
      ));
    amount = albumsArray.length;
  } else {
    albumsArray = albums
      .filter((album, index) => index >= random && index < random + 20)
      .map(album => (
        <AlbumSliderItem
          key={album.id || albums.indexOf(album)}
          artist={album.artist}
          title={album.title}
          year={album.year}
          cover={album.photoLinkBig ? album.photoLinkBig : album.photoLinkSmall}
          rymLink={album.rymLink}
        />
      ));
    amount = albumsArray.length;
  }

  return (
    <div id='albumSliderContainer'>
      <div id='albumSliderItemsContainer'>
        <div id='albumSliderItems'>
          <div id='items' style={{ transform: `translateX(${sliderShift}px)` }}>
            {albumsArray}
          </div>
        </div>
      </div>
      <div className={amount} id='sliderArrows'>
        <span className='sliderArrow' onClick={e => handleSliderArrowClick(e)}>{'<'}</span>
        <span className='sliderArrow' onClick={e => handleSliderArrowClick(e)}>{'>'}</span>
      </div>
    </div>
  );
};

export default AlbumSlider;