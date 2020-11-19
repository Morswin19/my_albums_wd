import React from 'react';

import Navigation from './Navigation';
import AlbumSliderItem from './AlbumSliderItem';

import '../styles/header.sass';
import HeaderAssets from '../imageAssets/HeaderAssets';

class Header extends React.Component {
  state = {
    sliderShift: 0,
    albums: this.props.albums,
    search: '',
    random: Math.floor(Math.random() * 270)
  };

  handleSearchChange = e => {
    let val = e.target.value;
    this.setState({
      search: val,
      sliderShift: 0
    });
  };

  handleSliderArrowClick = e => {
    const sliderItems = parseInt(e.target.parentElement.className);

    e.target.innerText === '<'
      ? this.state.sliderShift < 0 &&
        this.setState({
          sliderShift: this.state.sliderShift + 285
        })
      : this.state.sliderShift >
          -(285 * (sliderItems - (window.innerWidth > 650 ? 2 : 1))) &&
        this.setState({
          sliderShift: this.state.sliderShift - 285
        });
  };

  render() {
    const { albums } = this.props;
    let Album = [];
    let amount;
    if (this.state.search !== '') {
      Album = albums
        .filter(
          album =>
            album.artist
              .toLowerCase()
              .includes(this.state.search.toLowerCase()) ||
            album.title
              .toLowerCase()
              .includes(this.state.search.toLowerCase()) ||
            album.year.toLowerCase().includes(this.state.search.toLowerCase())
        )
        .map(album => (
          <AlbumSliderItem
            key={albums.indexOf(album)}
            artist={album.artist}
            title={album.title}
            year={album.year}
            cover={
              album.photoLinkBig ? album.photoLinkBig : album.photoLinkSmall
            }
            rymLink={album.rymLink}
          />
        ));
      amount = Album.length;
    } else {
      Album = albums
        .filter(
          (album, index) =>
            index >= this.state.random && index < this.state.random + 20
        )
        .map(album => (
          <AlbumSliderItem
            key={albums.indexOf(album)}
            artist={album.artist}
            title={album.title}
            year={album.year}
            cover={
              album.photoLinkBig ? album.photoLinkBig : album.photoLinkSmall
            }
            rymLink={album.rymLink}
          />
        ));
      amount = Album.length;
    }

    return (
      <div id='header'>
        <HeaderAssets />
        <div id='headerTextContainer'>
          <Navigation />
          <h1>
            My
            <br />
            music
          </h1>
          <h2>albums from my jukebox</h2>
          <form className='search info'>
            <input
              type='text'
              autoComplete='off'
              name='search'
              onChange={this.handleSearchChange}
              placeholder='search: eg. title, band, year'
            ></input>
            <div>
              <div>
                <div></div>
              </div>
            </div>
          </form>
          <div id='albumSliderContainer'>
            <div id='albumSliderItemsContainer'>
              <div id='albumSliderItems'>
                <div
                  id='items'
                  style={{
                    transform: `translateX(${this.state.sliderShift}px)`
                  }}
                >
                  {Album}
                </div>
              </div>
            </div>
            <div className={amount} id='sliderArrows'>
              <span
                className='sliderArrow'
                onClick={e => this.handleSliderArrowClick(e)}
              >
                {'<'}
              </span>
              <span
                className='sliderArrow'
                onClick={e => this.handleSliderArrowClick(e)}
              >
                {'>'}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
