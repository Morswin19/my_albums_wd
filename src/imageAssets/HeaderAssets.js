import React from 'react';

import blob from '../img/Path 2.svg';
import play from '../img/play.png';
import wave from '../img/Group 20.svg';

const HeaderAssets = () => {
  return (
    <div id='headerImageContainer'>
      <img className='blob' src={blob} alt='' />
      <img id='play' src={play} alt='' />
      <img className='wave' id='wave1' src={wave} alt='' />
      <img className='wave' id='wave2' src={wave} alt='' />
      <img className='wave' id='wave3' src={wave} alt='' />
      <img className='wave' id='wave4' src={wave} alt='' />
    </div>
  );
};

export default HeaderAssets;
