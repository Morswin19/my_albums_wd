import React from 'react';
import '../styles/Footer.sass';

const Footer = () => {
    return (
        <div className='follow'>
            <div>
                <h3>Follow me on Rate Your Music:</h3>
                <a href="https://rateyourmusic.com/~DaveMusta" target='_blank' rel="noopener noreferrer">
                    <img src="https://e.snmc.io/3.0/img/logo/sonemic-512.png" alt="" />
                </a>
            </div>
            <div>
                <h3>Follow me on GitHub:</h3>
                <a href="https://github.com/Morswin19" target='_blank' rel="noopener noreferrer">
                    <img src="https://img.pngio.com/github-logo-icon-of-glyph-style-available-in-svg-png-eps-ai-github-icon-png-256_256.png" alt="" />
                </a>
            </div>
            <div>
                <h3>Follow me on Facebook:</h3>
                <a href="https://www.facebook.com/jedenkawalek/" target='_blank' rel="noopener noreferrer">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Facebook_Icon_%28Single_Path_-_Transparent_%22f%22%29.svg/1200px-Facebook_Icon_%28Single_Path_-_Transparent_%22f%22%29.svg.png" alt="" />
                </a>
            </div>
        </div>
    );
}

export default Footer;