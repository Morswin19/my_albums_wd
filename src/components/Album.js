import React from 'react';
import './Album.sass'

const Album = props => (
    <div className='album'>
        <ul>
            <li><h5>artist: </h5> <h4> {props.artist}</h4></li>
            <li><h5>title: </h5> <h4> {props.title}</h4></li>
            <li><h5>year: </h5> <h4> {props.year}</h4></li>
        </ul>
        <div className='img'></div>
    </div>
)

export default Album;