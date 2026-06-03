import React, { useState, useEffect, useMemo } from 'react';
import AlbumSliderItem from './AlbumSliderItem';

const AlbumSlider = ({ albums, search }) => {
  const [sliderShift, setSliderShift] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [dragShift, setDragShift] = useState(0);

  const random = useMemo(() => {
    if (!albums || albums.length === 0) return 0;
    const maxStartIndex = Math.max(0, albums.length - 2 );
    return Math.floor(Math.random() * (maxStartIndex + 1));
  }, [albums.length]);

  // Set slider position to 0 during a search, otherwise jump to the random starting album
  useEffect(() => {
    setSliderShift(search ? 0 : -(random * 285));
  }, [search, random]);

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
          id={album.id || albums.indexOf(album)}
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
      .map(album => (
        <AlbumSliderItem
          key={album.id || albums.indexOf(album)}
          id={album.id || albums.indexOf(album)}
          artist={album.artist}
          title={album.title}
          year={album.year}
          cover={album.photoLinkBig ? album.photoLinkBig : album.photoLinkSmall}
          rymLink={album.rymLink}
        />
      ));
    amount = albumsArray.length;
  }

  const slideLeft = () => {
    if (sliderShift < 0) setSliderShift(sliderShift + 285);
  };

  const slideRight = () => {
    const maxShift = -(285 * (amount - (window.innerWidth > 650 ? 2 : 1)));
    if (sliderShift > maxShift) setSliderShift(sliderShift - 285);
  };

  const handleSliderArrowClick = e => {
    e.target.innerText === '<' ? slideLeft() : slideRight();
  };

  const handleTouchStart = e => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = e => {
    if (touchStartX !== null) {
      setDragShift(e.touches[0].clientX - touchStartX);
    }
  };

  const handleTouchEnd = () => {
    if (dragShift < -50) slideRight();
    else if (dragShift > 50) slideLeft();

    setTouchStartX(null);
    setDragShift(0);
  };

  return (
    <div id='albumSliderContainer'>
      <div 
        id='albumSliderItemsContainer'
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: 'pan-y' }}
      >
        <div id='albumSliderItems'>
          <div id='items' style={{ transform: `translateX(${sliderShift + dragShift}px)`, transition: touchStartX !== null ? 'none' : '0.5s ease-in-out' }}>
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