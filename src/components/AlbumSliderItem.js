import React from 'react';

import '../styles/AlbumSliderItem.sass'
import Album from './Album';

const AlbumsSliderItem = (props) => {
    return (
        <div className="albumSliderItem">
            <div className='img'>
                <img src={props.cover} alt="" />
            </div>
            <span className="sliderYear">{props.year}</span>
            <p><span>{props.title}</span><span> {'//'} {props.artist}</span></p>
        </div>
    );
}

export default AlbumsSliderItem;
