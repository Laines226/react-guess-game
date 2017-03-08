// Must have at least one test file in this directory or Mocha will throw an error.
import React, { Component } from 'react';
import DisplayLives from './DisplayLives';
import History from './History';
import '../styles/text.css';

class GuessGame extends Component {
    constructor(props, context) {
        super(props, context);
        let randomNumber = this.createRandomNumber(this.props.minRange, this.props.maxRange);
        this.state = {
            result: '',
            randomNumber: randomNumber,
            typedNumber: '',
            currentLive: this.props.noLives,
            lastTries: []
        };

        this.fontHeight = 20;

        this.inputChanged = this.inputChanged.bind(this);
        this.checkNumber = this.checkNumber.bind(this);
        this.keyPressed = this.keyPressed.bind(this);
        this.calculateHeight = this.calculateHeight.bind(this);
    }

    createRandomNumber(minRange, maxRange) {
        console.log("createRandomNumber [minRange], [maxRange]", minRange, maxRange);
        return Math.round(minRange + (Math.random() * (maxRange - minRange)));
    }

    dieOneLive() {
        let livesLeft = this.state.currentLive - 1;
        if (livesLeft < 1) {
            alert("Game Over");
            this.setState({ currentLive: livesLeft });
        }
        else {
            this.setState({ currentLive: livesLeft });
        }
    }
    calculateHeight() {
        let step = Math.round((this.props.maxRange - this.props.minRange) / 10);
        let difference = this.state.typedNumber - this.state.randomNumber;
        let differenceMod = Math.round(difference / step);

        console.log("calculateHeight", step, difference, differenceMod);

        this.fontHeight = 20 + differenceMod;
    }
    keyPressed(event) {
        console.log("keyPressed [event], [key]", event, event.key);
        if (event.key === "Enter") {
            this.checkNumber();
        }
    }
    inputChanged(event) {
        this.setState({ typedNumber: event.target.value });
        console.log("inputChanged [typedNumber]", this.state.typedNumber);
    }
    checkNumber() {
        console.log("checkNumber [typedNumber], [randomNumber]", this.state.typedNumber, this.state.randomNumber);
        if (this.state.typedNumber < this.props.minRange || this.state.typedNumber > this.props.maxRange) {
            alert("Typed number is out of range!");
        }
        else {
            let result = '';
            if (this.state.typedNumber < this.state.randomNumber) {
                result = 'too small';
                this.dieOneLive();
            }
            else if (this.state.typedNumber > this.state.randomNumber) {
                result = 'too big';
                this.dieOneLive();
            }
            else {
                result = 'You got it!!';
            }
            this.state.lastTries.push(this.state.typedNumber + ' ' + result);
            this.setState({ result: result, typedNumber: "" });
            this.calculateHeight();
            console.log("checkNumber [result], [state]", result, this.state);
        }
    }
    render() {
        let heightOfResult = this.fontHeight;
        let cnResultText = (this.state.result != 'You got it!!') ? 'red-text' : 'green-text';
        return (
            <div onKeyPress={this.keyPressed}>
                <h1>Guess-Game</h1>
                <span>Type in a number between {this.props.minRange} and {this.props.maxRange} :</span>
                <br />
                <span>
                    <input type="number" value={this.state.typedNumber} onChange={this.inputChanged} />
                    <button onClick={this.checkNumber} >Check</button>
                </span>
                <br />
                <span className={cnResultText} style={{ fontSize: heightOfResult }}>{this.state.result}</span>
                <br />
                <DisplayLives maxLives={this.props.noLives} currentLive={this.state.currentLive} />
                <History listToDisplay={this.state.lastTries} />
            </div>
        );
    }
}

GuessGame.defaultProps = {
    noLives: 7,
    minRange: 0,
    maxRange: 100
}

GuessGame.propTypes = {
    noLives: React.PropTypes.number,
    minRange: React.PropTypes.number,
    maxRange: React.PropTypes.number
}

export default GuessGame;
