import React from 'react';
import Navigation from './Navigation';
import '../styles/header.sass'

const Header = (props) => {
    return (
        <div id="header">
            <div id="headerImageContainer">
                {/* image container */}
            </div>
            <div id="headerTextContainer">
                <Navigation />
                <h1>My<br />music</h1>
                <p>albums from my jukebox</p>
            </div>
        </div>
    );
}

export default Header;