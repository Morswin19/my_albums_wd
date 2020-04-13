import React from 'react';
import '../styles/Album.sass'

const Album = props => (
    <div className='album'>
        <ul>
            <li><h5>artist: </h5> <h4> {props.artist}</h4></li>
            <li><h5>title: </h5> <h4> {props.title}</h4></li>
            <li><h5>year: </h5> <h4> {props.year}</h4></li>

        </ul>
        <a href={props.rymLink} target='_blank' rel="noopener noreferrer"><img src="https://e.snmc.io/3.0/img/logo/sonemic-512.png" alt="" /></a>
        <div className='img'>
            <img src={props.cover} alt="" />
        </div>
    </div>
)

export default Album;