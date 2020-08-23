import React from 'react';

import Navigation from './Navigation';
import AlbumSliderItem from './AlbumSliderItem';

import blob from '../img/Path 2.svg'
import play from '../img/play.png'
import wave from '../img/Group 20.svg'

import '../styles/header.sass'

const Header = (props) => {
    return (
        <div id="header">
            <div id="headerImageContainer">
                <img className='blob' src={blob} alt="" />
                <img id="play" src={play} alt="" />
                <img className="wave" id="wave1" src={wave} alt="" />
                <img className="wave" id="wave2" src={wave} alt="" />
                <img className="wave" id="wave3" src={wave} alt="" />
                <img className="wave" id="wave4" src={wave} alt="" />
            </div>
            <div id="headerTextContainer">
                <Navigation props={props} />
                <h1>My<br />music</h1>
                <h3>albums from my jukebox</h3>
                <div id="albumSlider">
                    <span className='sliderArrow'>{'<'}</span>
                    <AlbumSliderItem />
                    <AlbumSliderItem />
                    <span className='sliderArrow'>{'>'}</span>
                </div>
            </div>

        </div>
    );
}

export default Header;