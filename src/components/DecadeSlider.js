import React from 'react';

import '../styles/DecadeSlider.sass'

class DecadeSlider extends React.Component {
    state = {
        active: 'show all'
    }
    render() {
        const { active } = this.state
        const { timeArray } = this.props
        let decadeList = timeArray.map((item, index) => <li className={item === active ? 'decade active' : 'decade'} key={index} > {item}</li>)
        return (
            < div id="decadeSlider" >
                <ul>
                    {decadeList}
                </ul>
                <div id="activeContainer">
                    <div></div>
                </div>
                <div id="decadeArrows">
                    <span>{'<'}</span>
                    <span>{'>'}</span>
                </div>
            </div >
        );
    }
}

export default DecadeSlider;