import React from 'react';

import '../styles/DecadeSlider.sass'

class DecadeSlider extends React.Component {
    state = {}
    render() {
        const { timeArray } = this.props
        let decadeList = timeArray.map((item, index) => <li className='decade' key='index'>{item}</li>)
        return (
            < div id="decadeSlider" >
                <ul>
                    {decadeList}
                </ul>
            </div >
        );
    }
}

export default DecadeSlider;