import React from 'react';

import '../styles/AlbumSliderItem.sass'

const AlbumSliderItem = () => {
    return (
        <div className="albumSliderItem">
            <div className='img'>
                <img src='https://e.snmc.io/i/fullres/w/4a3362886ae63678bc15d93b029db149/1553033' alt="" />
            </div>
            <span className="sliderYear">1986</span>
            <p><span>The Colours Of Spring</span><span> // Talk Talk</span></p>
        </div>
    );
}

export default AlbumSliderItem;