import React from 'react';
import '../styles/Album.sass'

const Album = props => (
    <div className='album'>
        <div className='albumInfoContainer'>
            <div className='img'>
                <img src={props.cover} alt="" />
            </div>
            <ul>
                <li><h4> {props.title}</h4></li>
                <li><h4> {props.artist}</h4></li>
                <li><h2> {props.year}</h2></li>
            </ul>
        </div>
        <a href={props.rymLink} target='_blank' rel="noopener noreferrer">
            <div></div>
        </a>
    </div>
)

export default Album;