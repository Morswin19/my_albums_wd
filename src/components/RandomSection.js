import React from 'react';
import { NavLink } from 'react-router-dom';

import kostkiNiebieskie from '../img/kostkiniebieskie.svg';
import blob from '../img/Path 2.svg';
import wave from '../img/Group 20.svg';
import wave2 from '../img/Group 30.svg';

import '../styles/RandomSection.sass';

const RandomSection = props => {
  return (
    <div id='randomSection'>
      <div id='randomSectionText'>
        <h2>Random pick?</h2>
        <NavLink to='/today'>
          <button onClick={props.btnClickFunc}>click to choose</button>
        </NavLink>
        <img src={kostkiNiebieskie} alt='' id='kostkiNiebieskie' />
        <img src={blob} alt='' id='blob1' className='blob' />
        <img src={blob} alt='' id='blob2' className='blob' />
        <img src={wave} alt='' id='randomWave1' className='wave' />
        <img src={wave} alt='' id='randomWave2' className='wave' />
        <img src={wave2} alt='' id='randomWave3' className='wave' />
        <img src={wave} alt='' id='randomWave4' className='wave' />
        <img src={wave} alt='' id='randomWave5' className='wave' />
        <img src={wave} alt='' id='randomWave6' className='wave' />
      </div>
    </div>
  );
};

export default RandomSection;
