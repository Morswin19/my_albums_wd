import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = (props) => (
    <>
        <nav>
            <ul className='naviList'>
                <li><NavLink to='/' exact>show all</NavLink></li>
                <li><NavLink to='/60s'>60s</NavLink></li>
                <li><NavLink to='/70s'>70s</NavLink></li>
                <li><NavLink to='/80s'>80s</NavLink></li>
                <li><NavLink to='/90s'>90s</NavLink></li>
                <li><NavLink to='/00s'>00s</NavLink></li>
                <li><NavLink to='/10s'>10s</NavLink></li>
            </ul>
        </nav>
    </>
)

export default Navigation