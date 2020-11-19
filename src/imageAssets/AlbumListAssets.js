import React from 'react';

import blob from '../img/Path 2.svg';
import wave from '../img/Group 20.svg';
import wave2 from '../img/Group 30.svg';

const AlbumListAssets = () => {
  return (
    <>
      <img src={blob} alt='' id='blob5' className='blob' />
      <img src={wave} alt='' id='albumListWave1' className='wave' />
      <img src={wave2} alt='' id='albumListWave2' className='wave' />
      <img src={wave2} alt='' id='albumListWave3' className='wave' />
    </>
  );
};

export default AlbumListAssets;
