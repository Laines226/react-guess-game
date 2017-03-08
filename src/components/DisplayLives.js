import React from 'react';
import symbolForLifeLossed from '../images/heart_empty.png';
import symbolForLifeLeft from '../images/heart_full.png';

class DisplayLives extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        let count = 0;
        let lives = [];
        console.log("render DisplayLives [currentLives], [maxLives]", this.props.currentLive, this.props.maxLives);
        for (let count = 0; count < this.props.maxLives; count++) {
            if (count < this.props.currentLive) {
                lives.push(<img key={count} src={symbolForLifeLeft} />);
            }
            else {
                lives.push(<img key={count} src={symbolForLifeLossed} />);
            }
        };
        return (
            <div>
                <span>{lives} </span>
            </div>
        );
    }
}

DisplayLives.propTypes = {
    maxLives: React.PropTypes.number.isRequired,
    currentLive: React.PropTypes.number.isRequired
}

export default DisplayLives;
