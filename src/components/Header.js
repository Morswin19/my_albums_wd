import React from 'react';

import Navigation from './Navigation';
import AlbumSliderItem from './AlbumSliderItem';

import '../styles/header.sass'

const Header = (props) => {
    return (
        <div id="header">
            <div id="headerImageContainer">
                {/* image container */}
            </div>
            <div id="headerTextContainer">
                <Navigation />
                <h1>My<br />music</h1>
                <h3>albums from my jukebox</h3>
                <div id="albumSlider">
                    <span className='sliderArrow'>v</span>
                    <AlbumSliderItem />
                    <AlbumSliderItem />
                    <span className='sliderArrow'>v</span>
                </div>
            </div>

        </div>
    );
}

export default Header;