import React from 'react';
import { NavLink } from 'react-router-dom';
import RandomSectionAssets from '../imageAssets/RandomSectionAssets';

import '../styles/RandomSection.sass';

const RandomSection = props => {
  return (
    <div id='randomSection'>
      <div id='randomSectionText'>
        <h2>Random pick?</h2>
        <NavLink to='/today'>
          <button onClick={props.btnClickFunc}>click to choose</button>
        </NavLink>
        <RandomSectionAssets />
      </div>
    </div>
  );
};

export default RandomSection;
