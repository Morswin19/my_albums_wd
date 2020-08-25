import React from 'react';

import '../styles/DecadeSlider.sass'

class DecadeSlider extends React.Component {
    state = {
        activeNumber: 3
    }
    handleDecadeClick = (a) => {
        if ((a === -1 && this.state.activeNumber > 0) || (a === 1 && this.state.activeNumber < 6)) {
            this.setState({
                activeNumber: this.state.activeNumber + a
            })
        }
        console.log(this.state.activeNumber)
    }
    render() {
        const { activeNumber } = this.state
        const { timeArray } = this.props
        let decadeList = timeArray.map((item, index) => <li className={index === activeNumber ? 'decade active' : 'decade'} key={index} > {item}</li>)
        return (
            < div id="decadeSlider" >
                <div id="decadeListContainer">
                    <ul style={{ transform: `translateX(${-1225 - (activeNumber - 3) * 350}px)` }}>
                        {decadeList}
                    </ul>
                </div>
                <div id="activeContainer">
                    <div></div>
                </div>
                <div id="decadeArrows">
                    <span onClick={() => this.handleDecadeClick(-1)}>{'<'}</span>
                    <span onClick={() => this.handleDecadeClick(1)}>{'>'}</span>
                </div>
            </div >
        );
    }
}

export default DecadeSlider;