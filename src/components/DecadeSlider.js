import React from 'react';
import { NavLink } from 'react-router-dom';

import '../styles/DecadeSlider.sass'

class DecadeSlider extends React.Component {
    state = {
        activeNumber: 3,
        decadeLeftLink: '80s',
        decadeRightLink: '90s',
        lexact: false,
        rexact: false,
        resizeBool: false
    }

    handleDecadeClick = (a) => {
        if ((a === -1 && this.state.activeNumber > 0) || (a === 1 && this.state.activeNumber < 6)) {
            let activeNumber = this.state.activeNumber + a
            const decadeLinks = ['60s', '70s', '80s', '', '90s', '00s', '10s']
            if (activeNumber === 0) { this.setState({ decadeLeftLink: decadeLinks[0], decadeRightLink: decadeLinks[1] }) };
            if (activeNumber === 1) { this.setState({ decadeLeftLink: decadeLinks[0], decadeRightLink: decadeLinks[2] }) };
            if (activeNumber === 2) { this.setState({ decadeLeftLink: decadeLinks[1], decadeRightLink: decadeLinks[3] }) };
            if (activeNumber === 3) { this.setState({ decadeLeftLink: decadeLinks[2], decadeRightLink: decadeLinks[4] }) };
            if (activeNumber === 4) { this.setState({ decadeLeftLink: decadeLinks[3], decadeRightLink: decadeLinks[5] }) };
            if (activeNumber === 5) { this.setState({ decadeLeftLink: decadeLinks[4], decadeRightLink: decadeLinks[6] }) };
            if (activeNumber === 6) { this.setState({ decadeLeftLink: decadeLinks[5], decadeRightLink: decadeLinks[6] }) };
            this.setState({
                activeNumber: this.state.activeNumber + a,
            })
        }
    }

    handleResize = () => {
        window.innerWidth < 1100
            ? this.setState({ resizeBool: true })
            : this.setState({ resizeBool: false })
    }

    handlePath = () => {
        console.log('hello guinea Pig')
        const mainLocation = '#/my_albums_wd/'
        if (window.location.hash === mainLocation + '60s') {
            this.setState({ activeNumber: 0 })
        }
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize)
        this.handleResize()
    }

    render() {
        const { activeNumber, decadeLeftLink, decadeRightLink, lexact, rexact, resizeBool } = this.state
        const { timeArray } = this.props
        let decadeList = timeArray.map((item, index) => <li className={index === activeNumber ? 'decade active' : 'decade'} key={index} > {item}</li>)
        return (
            < div id="decadeSlider" >
                <div id="decadeListContainer">
                    <ul style={!resizeBool ? { transform: `translateX(${-1225 - (activeNumber - 3) * 350}px)` } : (window.innerWidth > 650 ? { transform: `translateX(${-875 - (activeNumber - 3) * 250}px)` } : { transform: `translateX(${- 630 - (activeNumber - 3) * 180}px)` })}>
                        {decadeList}
                    </ul>
                </div>
                <div id="activeContainer">
                    <div></div>
                </div>
                <div id="decadeArrows">
                    <span onClick={() => this.handleDecadeClick(-1)}><NavLink to={decadeLeftLink} exact={lexact}>{'<'}</NavLink></span>
                    <span onClick={() => this.handleDecadeClick(1)}><NavLink to={decadeRightLink} exact={rexact}>{'>'}</NavLink></span>
                </div>
            </div >
        );
    }
}

export default DecadeSlider;