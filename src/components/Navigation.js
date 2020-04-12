import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => (

    <>
        <nav>
            <ul className='naviList'>
                <li><Link to='/'>all albums</Link></li>
                <li><Link to='/60s'>60s</Link></li>
                <li><Link to='/70s'>70s</Link></li>
                <li><Link to='/80s'>80s</Link></li>
                <li><Link to='/90s'>90s</Link></li>
                <li><Link to='/00s'>00s</Link></li>
                <li><Link to='/10s'>10s</Link></li>
            </ul>
        </nav>
    </>
)

export default Navigation