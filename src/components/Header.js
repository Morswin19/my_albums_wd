import React from 'react';

import Navigation from './Navigation';
import AlbumSliderItem from './AlbumSliderItem';

import blob from '../img/Path 2.svg'
import play from '../img/play.png'
import wave from '../img/Group 20.svg'

import '../styles/header.sass'

class Header extends React.Component {
    state = {}

    randomiseAlbums = (array) => {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    render() {
        let albumSliderArray = this.randomiseAlbums(this.props.albums);
        const AlbumSliderItems = this.props.albums.filter((album, index) => index < 20).map((album, index) => <AlbumSliderItem key={index} title={album.title} artist={album.artist} cover={album.photoLink} year={album.year} />)

        console.log(albumSliderArray)
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
                    <Navigation props={this.props} />
                    <h1>My<br />music</h1>
                    <h3>albums from my jukebox</h3>
                    <div id="albumSliderContainer">
                        <div id="albumSliderItemsContainer">
                            <div id="albumSliderItems">
                                <div id="items">
                                    {AlbumSliderItems}
                                </div>
                            </div>
                        </div>
                        <div id="sliderArrows">
                            <span className='sliderArrow'>{'<'}</span>
                            <span className='sliderArrow'>{'>'}</span>
                        </div>

                    </div>
                </div>

            </div>
        );
    }
}

export default Header;