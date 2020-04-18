import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Album from './Album';
import '../styles/AlbumList.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDice } from '@fortawesome/free-solid-svg-icons'

class AlbumList extends Component {
    state = {

    }

    handleRandomButtonClick = () => {
        let albums = [...this.props.albums];
        let index = Math.floor(Math.random() * albums.length);
        let todaysAlbum = albums[index];
        const today = <Album key={1} artist={todaysAlbum.artist} title={todaysAlbum.title} year={todaysAlbum.year} cover={todaysAlbum.cover} rymLink={todaysAlbum.rymLink} />;

        this.setState({
            albums: today,
            amount: 1
        })
    }

    render() {
        const { albums, time } = this.props
        let album = [];
        let amount = album.length
        if (time === 'all') {
            album = albums.map(album => <Album key={albums.indexOf(album)} artist={album.artist} title={album.title} year={album.year} cover={album.cover} rymLink={album.rymLink} />)
        } else if (time === 'today') {
            let index = Math.floor(Math.random() * albums.length);
            album = albums.filter(album => albums.indexOf(album) === index).map(album => <Album key={albums.indexOf(album)} artist={album.artist} title={album.title} year={album.year} cover={album.cover} rymLink={album.rymLink} />)
        } else {
            album = albums.filter(album => album.year >= time && album.year < parseInt(time) + 10).map(album => <Album key={albums.indexOf(album)} artist={album.artist} title={album.title} year={album.year} cover={album.cover} rymLink={album.rymLink} />)
        }
        amount = album.length
        return (
            <div>
                <div className='randomAmount'>
                    <div className='amount info'>
                        Number: {amount}
                    </div>
                    <div className='random info' onClick={amount === 1 ? this.handleRandomButtonClick : null}><NavLink to='/today'>
                        Today You will listen: <span><FontAwesomeIcon icon={faDice} /></span>
                    </NavLink>
                    </div>
                </div>
                <div className='albumList'>
                    {album}
                </div>
            </div>
        );
    }
}

export default AlbumList;