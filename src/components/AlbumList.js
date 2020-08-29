import React, { Component } from 'react';
// import { NavLink } from 'react-router-dom';

import Album from './Album';
import DecadeSlider from './DecadeSlider';
import RandomSection from './RandomSection';

import blob from '../img/Path 2.svg';
import wave from '../img/Group 20.svg';
import wave2 from '../img/Group 30.svg';

import '../styles/AlbumList.sass';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faDice } from '@fortawesome/free-solid-svg-icons'
// import { faSearch } from '@fortawesome/free-solid-svg-icons'

class AlbumList extends Component {
    state = {
        search: '',
        albumsSite: 1,
        albumSiteListAmount: ''
    }

    timeLine = ['60s', '70s', '80s', 'show all', '90s', '00s', '10s']

    handleRandomButtonClick = () => {
        let albums = [...this.props.albums];
        let index = Math.floor(Math.random() * albums.length);
        let todaysAlbum = albums[index];
        const today = <Album key={1} artist={todaysAlbum.artist} title={todaysAlbum.title} year={todaysAlbum.year} cover={todaysAlbum.cover} rymLink={todaysAlbum.rymLink} />;

        this.setState({
            albums: today,
            amount: 1,
            time: ''
        })
        console.log('helloGuineaPig')
    }

    handleSearchChange = (e) => {
        let val = e.target.value;
        this.setState({
            search: val
        })
    }

    handlePaginationClick = (e) => {
        window.scrollTo(window.scrollX, 920);
        this.setState({
            albumsSite: parseInt(e.target.innerHTML)
        })
    }

    handlePaginationArrowClick = (a) => {

        if (this.state.albumsSite > 1 && a === (-1)) {
            this.setState({
                albumsSite: this.state.albumsSite + a
            })
            window.scrollTo(window.scrollX, 920);
        } else if (a === 1) {
            if (this.props.time === "all" && (this.state.albumsSite < this.props.albums.length / 25)) {
                this.setState({
                    albumsSite: this.state.albumsSite + a
                })
                window.scrollTo(window.scrollX, 920);
            } else if (this.props.time !== "all" && this.props.time !== "today"
            ) {
                let albums = this.props.albums.filter(album => album.year >= this.props.time && album.year < parseInt(this.props.time) + 10)
                if (this.state.albumsSite < albums.length / 25) {
                    this.setState({
                        albumsSite: this.state.albumsSite + a
                    })
                    window.scrollTo(window.scrollX, 920);
                }
            }
        }
    }

    resetPagination = () => {
        this.setState({
            time: this.props.time,
            albumsSite: 1
        })
    }

    componentDidUpdate() {
        if (this.props.time !== this.state.time) {
            this.resetPagination()
        }
    }

    render() {
        const { albums, time } = this.props
        const { albumsSite } = this.state
        let album = [];
        let amount;
        let albumSiteList = []
        let albumSiteListAmount;
        if (this.state.search === '') {
            if (time === 'all') {
                // album = albums.map(album => <Album key={albums.indexOf(album)} artist={album.artist} title={album.title} year={album.year} cover={album.photoLink} rymLink={album.rymLink} />)
                album = albums
                    .filter((album, index) => (index >= (albumsSite * 25 - 25) && index < (albumsSite * 25)))
                    .map((album, index) => <Album key={index} artist={album.artist} title={album.title} year={album.year} cover={album.photoLink} rymLink={album.rymLink} />)
                amount = albums.length
            } else if (time === 'today') {
                let index = Math.floor(Math.random() * albums.length);
                album = albums
                    .filter(album => albums.indexOf(album) === index)
                    .map(album => <Album key={albums.indexOf(album)} artist={album.artist} title={album.title} year={album.year} cover={album.photoLink} rymLink={album.rymLink} />)
                amount = album.length
            } else {
                album = albums
                    .filter(album => album.year >= time && album.year < parseInt(time) + 10)
                    .map(album => <Album key={albums.indexOf(album)} artist={album.artist} title={album.title} year={album.year} cover={album.photoLink} rymLink={album.rymLink} />)
                amount = album.length

                album = album.filter((album, index) => (index >= (albumsSite * 25 - 25) && index < (albumsSite * 25)))
            }
        } else {
            album = albums
                .filter(album => album.artist.toLowerCase().includes(this.state.search.toLowerCase()) || album.title.toLowerCase().includes(this.state.search.toLowerCase()) || album.year.toLowerCase().includes(this.state.search.toLowerCase()))
                .map(album => <Album key={albums.indexOf(album)} artist={album.artist} title={album.title} year={album.year} cover={album.photoLink} rymLink={album.rymLink} />)
            amount = album.length
        }
        if (amount === 0) { albumSiteListAmount = 0 }
        else { albumSiteListAmount = (Math.floor(amount / 25 + 1)) }
        for (let i = 1; i <= albumSiteListAmount; i++) {
            albumSiteList.push(i);
        }
        albumSiteList = albumSiteList.map(item => <li key={item} className={item === albumsSite ? 'active' : ''} onClick={this.handlePaginationClick}>{item}</li>);
        return (
            <div>
                {/* 
                    <div className='amount info'>
                        Number: {amount}
                    </div>
                    <form className="search info">
                        <input type="text" name="search" onChange={this.handleSearchChange} placeholder="search"></input>
                        <span><FontAwesomeIcon icon={faSearch} /></span>
                    </form>
                </div> */}
                <DecadeSlider timeArray={this.timeLine} />
                <div id="albumList" className='albumList'>
                    {album}
                    <img src={blob} alt="" id="blob5" className="blob" />
                    <img src={wave} alt="" id="albumListWave1" className="wave" />
                    <img src={wave2} alt="" id="albumListWave2" className="wave" />
                    <img src={wave2} alt="" id="albumListWave3" className="wave" />
                </div>
                <div id="albumSites">
                    <span onClick={() => this.handlePaginationArrowClick(-1)}>{'<'}</span>
                    <ul>
                        {albumSiteList}
                    </ul>
                    <span onClick={() => this.handlePaginationArrowClick(1)}>{'>'}</span>
                </div>
                <RandomSection btnClickFunc={this.handleRandomButtonClick} />
            </div >
        );
    }
}

export default AlbumList;