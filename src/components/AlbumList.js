import React, { Component } from 'react';
import Album from './Album';
import '../styles/AlbumList.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDice } from '@fortawesome/free-solid-svg-icons'

class AlbumList extends Component {
    state = {
        albums: [],
        amount: 0
    }

    handleRandomButtonClick = () => {
        let albums = [...this.props.albums];
        let index = Math.floor(Math.random() * albums.length);
        let todaysAlbum = albums[index];
        const today = <Album key={1} artist={todaysAlbum.artist} title={todaysAlbum.title} year={todaysAlbum.year} cover={todaysAlbum.cover} />;

        this.setState({
            albums: today,
            amount: 1
        })
    }

    // albumSelector = (time) => {
    //     let album = albums.filter(album => album.year >= '1970' && album.year < '1980').map(album => <Album key={albums.indexOf(album)} artist={album.artist} title={album.title} year={album.year} cover={album.cover} />)
    // }

    componentDidMount = () => {
        const { albums, time } = this.props
        let album = [];
        let amount = album.length
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

        amount = album.length

        this.setState({
            albums: [...album],
            amount
        })
    }

    render() {
        const { albums } = this.props

        let album = 'Hellog Guinea Pig';
        let amount = ''

        album = this.props.albums.map(album => <Album key={albums.indexOf(album)} artist={album.artist} title={album.title} year={album.year} cover={album.cover} rymLink={album.rymLink} />)
        amount = album.length

        return (
            <div>
                <div className='randomAmount'>
                    <div className='amount info'>
                        Number: {this.state.amount !== 0 ? this.state.amount : amount}
                    </div>
                    <div className='random info' onClick={this.handleRandomButtonClick}>
                        Today You will listen: <span><FontAwesomeIcon icon={faDice} /></span>
                    </div>
                </div>
                <div className='albumList'>
                    {this.state.albums.length !== 0 ? this.state.albums : album}
                </div>
            </div>
        );
    }
}

export default AlbumList;