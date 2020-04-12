import React, { Component } from 'react';
import Album from './Album';
import '../styles/AlbumList.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDice } from '@fortawesome/free-solid-svg-icons'

class AlbumList extends Component {
    state = {
        albums: []
    }

    // getAlbumsList = () => {

    // }

    render() {
        const { albums, time } = this.props

        let album = 'Hellog Guinea Pig';
        let amount = ''

        // const albumMap = <Album key={albums.indexOf(album)} artist={album.artist} title={album.title} year={album.year} />

        if (time === 'all') {
            album = albums.map(album => <Album key={albums.indexOf(album)} artist={album.artist} title={album.title} year={album.year} cover={album.cover} />)
            amount = album.length
        } else if (time === '60') {
            album = albums.filter(album => album.year < '1970').map(album => <Album key={albums.indexOf(album)} artist={album.artist} title={album.title} year={album.year} cover={album.cover} />)
            amount = album.length
        } else if (time === '70') {
            album = albums.filter(album => album.year >= '1970' && album.year < '1980').map(album => <Album key={albums.indexOf(album)} artist={album.artist} title={album.title} year={album.year} cover={album.cover} />)
            amount = album.length
        } else if (time === '80') {
            album = albums.filter(album => album.year >= '1980' && album.year < '1990').map(album => <Album key={albums.indexOf(album)} artist={album.artist} title={album.title} year={album.year} cover={album.cover} />)
            amount = album.length
        } else if (time === '90') {
            album = albums.filter(album => album.year >= '1990' && album.year < '2000').map(album => <Album key={albums.indexOf(album)} artist={album.artist} title={album.title} year={album.year} cover={album.cover} />)
            amount = album.length
        } else if (time === '00') {
            album = albums.filter(album => album.year >= '2000' && album.year < '2010').map(album => <Album key={albums.indexOf(album)} artist={album.artist} title={album.title} year={album.year} cover={album.cover} />)
            amount = album.length
        } else if (time === '10') {
            album = albums.filter(album => album.year >= '2010').map(album => <Album key={albums.indexOf(album)} artist={album.artist} title={album.title} year={album.year} cover={album.cover} />)
            amount = album.length
        }

        return (
            <div>
                <div className='randomAmount'>
                    <div className='amount'>
                        Number: {amount}
                    </div>
                    <div className='random'>
                        Today You will listen: <button><FontAwesomeIcon icon={faDice} /></button>
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