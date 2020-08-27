import React from 'react';

import Navigation from './Navigation';
import AlbumSliderItem from './AlbumSliderItem';

import blob from '../img/Path 2.svg'
import play from '../img/play.png'
import wave from '../img/Group 20.svg'

import '../styles/header.sass'

class Header extends React.Component {
    state = {
        sliderShift: 0,
        albums: this.props.albums
    }

    handleSliderArrowClick = (e) => {
        // console.log(e.target.innerText)
        e.target.innerText === '<' ? (this.state.sliderShift < 2574 &&
            this.setState({
                sliderShift: this.state.sliderShift + 286
            })
        ) : (this.state.sliderShift > -2574 &&
            this.setState({
                sliderShift: this.state.sliderShift - 286
            })
            )
        console.log(this.props)
    }

    // randomiseAlbums = (array) => {
    //     var currentIndex = array.length, temporaryValue, randomIndex;

    //     // While there remain elements to shuffle...
    //     while (0 !== currentIndex) {

    //         // Pick a remaining element...
    //         randomIndex = Math.floor(Math.random() * currentIndex);
    //         currentIndex -= 1;

    //         // And swap it with the current element.
    //         temporaryValue = array[currentIndex];
    //         array[currentIndex] = array[randomIndex];
    //         array[randomIndex] = temporaryValue;
    //     }

    //     let newAlbumsArray = [...array];

    //     return array;
    // }
    componentDidMount() {
        console.log(this.props)
    }

    render() {
        const AlbumSliderItems = this.props.albums.filter((album, index) => index < 20).map((album, index) => <AlbumSliderItem key={index} title={album.title} artist={album.artist} cover={album.photoLink} year={album.year} />)
        // console.log(this.state.sliderShift)
        // console.log(albumSliderArray)
        console.log(this.props)
        console.log(this.state)
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
                    <form className="search info">
                        <input type="text" name="search" onChange={this.handleSearchChange} placeholder="search"></input>
                        {/* <span><FontAwesomeIcon icon={faSearch} /></span> */}
                    </form>
                    <div id="albumSliderContainer">
                        <div id="albumSliderItemsContainer">
                            <div id="albumSliderItems">
                                <div id="items" style={{ transform: `translateX(${this.state.sliderShift}px)` }}>
                                    {AlbumSliderItems}
                                </div>
                            </div>
                        </div>
                        <div id="sliderArrows">
                            <span className='sliderArrow' onClick={(e) => this.handleSliderArrowClick(e)}>{'<'}</span>
                            <span className='sliderArrow' onClick={(e) => this.handleSliderArrowClick(e)}>{'>'}</span>
                        </div>

                    </div>
                </div>

            </div>
        );
    }
}

export default Header;