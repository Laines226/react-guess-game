import React from 'react';

class DisplayLives extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        if (this.props.listToDisplay.length > 0) {
            const history = this.props.listToDisplay.map((element, index) => <p key={index}>{element}</p>);
            return (
                <div style={{ border: '3px solid green', width: '100px' }}>
                    {history}
                </div>
            );
        }
        return false;
    }
}

DisplayLives.propTypes = {
    listToDisplay: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
}

export default DisplayLives;
