import React from 'react';

import '../styles/AlbumSliderItem.sass'

const AlbumsSliderItem = (props) => {
    return (
        <div className="albumSliderItem">
            <div className='img'>
                <img src={props.cover} alt="" />
            </div>
            <span className="sliderYear">{props.year}</span>
            <a href={props.rymLink} target='_blank' rel="noopener noreferrer"><p><span>{props.title}</span><span> {'//'} {props.artist}</span></p></a>
        </div>
    );
}

export default AlbumsSliderItem;
