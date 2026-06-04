import React from 'react';

import '../styles/AlbumSliderItem.css'

const AlbumsSliderItem = (props) => {
    const handleClick = (e) => {
        if (e.target.closest('a')) return;
        window.location.hash = `#/album/${props.id}`;
        window.scrollTo(window.scrollX, 920);
    };

    return (
        <div className="albumSliderItem" onClick={handleClick} style={{ cursor: 'pointer' }}>
            <div className='img'>
                <img src={props.cover} alt="" />
            </div>
            <span className="sliderYear">{props.year}</span>
            <a href={props.rymLink} target='_blank' rel="noopener noreferrer"><p><span>{props.title}</span><span> {'//'} {props.artist}</span></p></a>
        </div>
    );
}

export default AlbumsSliderItem;
