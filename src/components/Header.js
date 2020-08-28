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
        albums: this.props.albums,
        search: '',
        random: Math.floor(Math.random() * (240))
    }

    handleSearchChange = (e) => {
        let val = e.target.value;
        this.setState({
            search: val,
            sliderShift: 0
        })
    }

    handleSliderArrowClick = (e) => {
        console.log(e.target.parentElement.className)
        const sliderItems = parseInt(e.target.parentElement.className)

        console.log(typeof (sliderItems))

        e.target.innerText === '<' ? (this.state.sliderShift < 0 &&
            this.setState({
                sliderShift: this.state.sliderShift + 286
            })
        ) : (this.state.sliderShift > -(286 * (sliderItems - 2)) &&
            this.setState({
                sliderShift: this.state.sliderShift - 286
            })
            )
        console.log(this.state.albums)
    }

    render() {
        const { albums } = this.props
        let Album = []
        let amount;
        if (this.state.search !== '') {
            Album = albums
                .filter(album => album.artist.toLowerCase().includes(this.state.search.toLowerCase()) ||
                    album.title.toLowerCase().includes(this.state.search.toLowerCase()) ||
                    album.year.toLowerCase().includes(this.state.search.toLowerCase()))
                .map(album => <AlbumSliderItem key={albums.indexOf(album)} artist={album.artist} title={album.title} year={album.year} cover={album.photoLink} rymLink={album.rymLink} />)
            amount = Album.length
        } else {
            let number = Math.floor(Math.random() * (albums.length - 20))
            Album = albums
                .filter((album, index) => index >= this.state.random && index < this.state.random + 20)
                .map(album => <AlbumSliderItem key={albums.indexOf(album)} artist={album.artist} title={album.title} year={album.year} cover={album.photoLink} rymLink={album.rymLink} />)
            amount = Album.length
        }

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
                        <input type="text" name="search" onChange={this.handleSearchChange} placeholder="search: eg. title, band"></input>
                        <div>
                            <div>
                                <div></div>
                            </div>
                        </div>
                    </form>
                    <div id="albumSliderContainer">
                        <div id="albumSliderItemsContainer">
                            <div id="albumSliderItems">
                                <div id="items" style={{ transform: `translateX(${this.state.sliderShift}px)` }}>
                                    {Album}
                                </div>
                            </div>
                        </div>
                        <div className={amount} id="sliderArrows">
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