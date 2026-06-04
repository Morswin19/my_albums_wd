import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import '../styles/DecadeSlider.css';

const DecadeSlider = ({ timeArray }) => {
    const location = useLocation();
    const [resizeBool, setResizeBool] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setResizeBool(window.innerWidth < 1100);
        };
        window.addEventListener('resize', handleResize);
        handleResize(); // Initialize on mount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Determine active index based on URL
    const currentPath = location.pathname;
    let activeNumber = timeArray.findIndex(item => {
        if (item === 'show all') return currentPath === '/';
        return currentPath === `/${item}`;
    });

    // Default to 'show all' (index 3) if path doesn't match a decade
    if (activeNumber === -1) {
        activeNumber = 3;
    }

    // Helper to safely format valid URLs for the arrows
    const getRoute = (index) => {
        if (index < 0 || index >= timeArray.length) return '';
        const item = timeArray[index];
        return item === 'show all' ? '/' : `/${item}`;
    };

    const decadeLeftLink = getRoute(activeNumber - 1);
    const decadeRightLink = getRoute(activeNumber + 1);

    const handleItemClick = (route) => {
        window.location.hash = route;
    };

    const decadeList = timeArray.map((item, index) => {
        const route = item === 'show all' ? '/' : `/${item}`;
        return (
            <li 
                className={index === activeNumber ? 'decade active' : 'decade'} 
                key={index}
                onClick={() => handleItemClick(route)}
                style={{ cursor: 'pointer' }}
            >
                {item}
            </li>
        );
    });

    return (
        <div id="decadeSlider">
            <div id="decadeListContainer">
                <ul style={!resizeBool ? { transform: `translateX(${-1225 - (activeNumber - 3) * 350}px)` } : (window.innerWidth > 650 ? { transform: `translateX(${-875 - (activeNumber - 3) * 250}px)` } : { transform: `translateX(${-630 - (activeNumber - 3) * 180}px)` })}>
                    {decadeList}
                </ul>
            </div>
            <div id="activeContainer">
                <div></div>
            </div>
            <div id="decadeArrowLeft">
                {activeNumber > 0 ? (
                    <span>
                        <NavLink to={decadeLeftLink} exact={decadeLeftLink === '/'}>{'<'}</NavLink>
                    </span>
                ) : <span></span>}
            </div>
            <div id="decadeArrowRight">
                {activeNumber < timeArray.length - 1 ? (
                    <span>
                        <NavLink to={decadeRightLink} exact={decadeRightLink === '/'}>{'>'}</NavLink>
                    </span>
                ) : <span></span>}
            </div>
        </div>
    );
};

export default DecadeSlider;